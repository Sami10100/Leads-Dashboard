# =====================
# vercel.json
# =====================
# Save this as: vercel.json

{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "functions": {
    "api/*.js": {
      "runtime": "nodejs18.x",
      "memory": 512
    }
  },
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET,POST,OPTIONS" }
      ]
    }
  ]
}


# =====================
# .env.example
# =====================
# Copy to .env.local — Add your FREE API keys here

# Google Custom Search (100 searches/day FREE)
# Get at: https://console.developers.google.com/
GOOGLE_API_KEY=your_google_api_key_here
GOOGLE_CX=your_custom_search_engine_id

# Hunter.io (25 searches/month FREE)
# Get at: https://hunter.io/api-keys
HUNTER_API_KEY=your_hunter_api_key_here

# SerpAPI for LinkedIn Google Dorking (100/month FREE)
# Get at: https://serpapi.com/
SERPAPI_KEY=your_serpapi_key_here

# Abstract API Email Validation (100/month FREE)
# Get at: https://www.abstractapi.com/
ABSTRACT_API_KEY=your_abstract_api_key_here

# Optional: RocketReach (5 free lookups/month)
ROCKETREACH_API_KEY=your_rocketreach_key_here


# =====================
# DEPLOYMENT README
# =====================

## LeadPro Platform — Vercel Deployment Guide

### Step 1: Setup Project
```bash
git init
git add .
git commit -m "Initial LeadPro setup"
```

### Step 2: Push to GitHub
```bash
# Create repo on github.com then:
git remote add origin https://github.com/yourusername/leadpro.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. vercel.com par jao
2. "Import Project" karo
3. GitHub repo select karo
4. Environment variables add karo (.env.example se copy karo)
5. Deploy!

### Step 4: Add Free API Keys (Priority Order)

#### 🥇 MUST HAVE (Free - Best Results)
1. **Hunter.io** — Email finder
   - signup: hunter.io → API Keys
   - Free: 25 searches/month
   - Add as: HUNTER_API_KEY

2. **SerpAPI** — LinkedIn + Google data
   - signup: serpapi.com
   - Free: 100 searches/month  
   - Add as: SERPAPI_KEY

#### 🥈 NICE TO HAVE (Free Tiers)
3. **Google Custom Search** — Company research
   - console.cloud.google.com
   - Free: 100/day
   - Add as: GOOGLE_API_KEY + GOOGLE_CX

4. **Abstract API** — Email validation
   - abstractapi.com
   - Free: 100/month
   - Add as: ABSTRACT_API_KEY

### Step 5: Custom Domain (Optional)
Vercel Settings → Domains → Add your domain
e.g., leadpro.yourdomain.com

### Free Tier Limits Summary
| API | Free Limit | Best For |
|-----|------------|---------|
| Hunter.io | 25/month | Email extraction |
| SerpAPI | 100/month | LinkedIn search |
| Google CSE | 100/day | Company research |
| Abstract API | 100/month | Email validation |
| Apollo.io | 50 credits | B2B contacts |

### Scaling (When you need more)
- Hunter.io Starter: $49/month (500 searches)
- SerpAPI Hobby: $50/month (5000 searches)  
- Apollo.io Basic: $49/month (unlimited exports)
- Clearbit: Pay per API call

### Features In This Version
✅ Industry-based lead search
✅ Job title targeting
✅ Location filtering
✅ LinkedIn profile extraction
✅ Email finding (Hunter.io)
✅ Email validation
✅ Lead scoring (0-100)
✅ CSV export
✅ Bulk actions
✅ Dashboard analytics
✅ Status management

### Coming Next (Phase 2)
⬜ User authentication (Clerk.dev - free)
⬜ Lead CRM with notes
⬜ Email sequence builder
⬜ Team collaboration
⬜ Webhook integrations
⬜ White-label for clients
