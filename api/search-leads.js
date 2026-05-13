module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method !== 'POST') return res.status(405).end();

  const { industry, titles, locations } = req.body;

  let leads = [];
  let source = 'demo';

  // HUNTER.IO
  if (process.env.HUNTER_API_KEY) {
    try {
      const r = await fetch(`https://api.hunter.io/v2/domain-search?domain=gmail.com&api_key=${process.env.HUNTER_API_KEY}&limit=5`);
      const d = await r.json();
      if (d.data && d.data.emails) {
        source = 'live';
        d.data.emails.forEach((c, i) => {
          leads.push({
            id: i, firstName: c.first_name || 'Contact', lastName: c.last_name || String(i),
            email: c.value, emailVerified: c.confidence > 70,
            position: c.position || titles[0] || 'Professional',
            company: industry + ' Company', industry, score: Math.floor(Math.random()*40)+60,
            source: 'Hunter.io', status: 'new',
            linkedin: c.linkedin || '', country: locations[0] || 'Pakistan', phone: ''
          });
        });
      }
    } catch(e) { console.log('Hunter error:', e.message); }
  }

  // SERPAPI — LinkedIn search
  if (process.env.SERPAPI_KEY) {
    try {
      const query = `site:linkedin.com/in "${titles[0]}" "${industry}" "${locations[0]}"`;
      const r = await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(query)}&api_key=${process.env.SERPAPI_KEY}&num=20`);
      const d = await r.json();
      if (d.organic_results) {
        source = 'live';
        d.organic_results.forEach((item, i) => {
          const parts = (item.title || '').split(' - ')[0].trim().split(' ');
          leads.push({
            id: leads.length + i,
            firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '',
            email: '', emailVerified: false,
            position: titles[i % titles.length] || 'Professional',
            company: (item.title || '').split(' - ')[1] || industry + ' Co',
            industry, score: Math.floor(Math.random()*40)+55,
            source: 'LinkedIn', status: 'new',
            linkedin: item.link || '', country: locations[0] || 'Pakistan', phone: ''
          });
        });
      }
    } catch(e) { console.log('SerpAPI error:', e.message); }
  }

  res.status(200).json({ success: true, leads, total: leads.length, source });
};
