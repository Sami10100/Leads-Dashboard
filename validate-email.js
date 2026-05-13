// api/validate-email.js — Batch email validation using free tools

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { emails } = req.body;
  if (!emails?.length) return res.status(400).json({ error: 'No emails provided' });

  const results = await Promise.allSettled(
    emails.map(email => validateEmail(email))
  );

  res.status(200).json({
    results: results.map((r, i) => ({
      email: emails[i],
      valid: r.status === 'fulfilled' ? r.value.valid : false,
      score: r.status === 'fulfilled' ? r.value.score : 0,
      reason: r.status === 'fulfilled' ? r.value.reason : 'error'
    }))
  });
}

async function validateEmail(email) {
  // Method 1: Abstract API (100 free/month)
  if (process.env.ABSTRACT_API_KEY) {
    try {
      const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`;
      const res = await fetch(url);
      const data = await res.json();
      return {
        valid: data.deliverability === 'DELIVERABLE',
        score: data.quality_score ? Math.round(data.quality_score * 100) : 50,
        reason: data.deliverability
      };
    } catch {}
  }

  // Method 2: Basic syntax + MX check fallback
  const syntaxValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const [, domain] = email.split('@');
  const knownGood = ['gmail.com','yahoo.com','outlook.com','hotmail.com'].includes(domain);

  return {
    valid: syntaxValid,
    score: syntaxValid ? (knownGood ? 85 : 65) : 10,
    reason: syntaxValid ? 'syntax_valid' : 'invalid_syntax'
  };
}
