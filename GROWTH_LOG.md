# SoloStack Growth Log
**Launch date:** 2026-03-18
**Live URL:** https://solostack-ten.vercel.app
**GitHub:** https://github.com/Magistesai/SoloStack

---

## Iteration Log

### 2026-03-19 — Refinement Cycle 1 + 2

**Cycle 1 changes (commit c13972a):**
- Expanded catalog from 26 → 50 tools
- Added 2 new categories: Auth (🔐) and Automation (⚙️)
- Added `bestFor` / `skipIf` verdict fields to all 50 tools
- Tool detail pages now show a structured Verdict box above the review
- Fixed `metadataBase` — was hardcoded to solostack.dev, now uses `VERCEL_URL` env var
- Fixed misleading "200+" tools count — now reads `tools.length` dynamically
- Updated Automation-First stack to include Make, 1-Day MVP to include Clerk

**Cycle 2 changes (commit d4b76e6):**
- Header: added animated hamburger menu with full mobile drawer nav
- Homepage: "Just Added" section with pulse indicator showing 4 newest tools
- Homepage: added "Updated Mar 2026" freshness signal to stats bar

**Current state:**
- 50 tools, 14 categories, 3 stacks
- 145 static pages built and deployed
- All routes verified 200 on solostack-ten.vercel.app

---

## Phase 1: Launch Week (Days 1–7)

### Organic Distribution

**Hacker News — Show HN post:**
```
Show HN: SoloStack.dev — Opinionated toolkit directory for solo founders

Tired of "best startup tools" lists that are either enterprise-focused or gaming
Product Hunt. Built SoloStack: 26 tools across 12 categories, each rated 0-100
by solo-founder fit (not general popularity).

Key difference: the "Solo Score" rating system — every tool is evaluated on
whether it works well when you're a team of one, not whether it's powerful in general.

Stack: Next.js 16 + static JSON data + Vercel. Deploys from GitHub, zero backend.
```

**Reddit posts (submit to all 3):**
- r/indiehackers: "I built an opinionated solo founder toolkit directory (no enterprise bloat)"
- r/SaaS: "Alternative to generic tool lists — ranked by solo-founder fit score"
- r/solopreneur: "SoloStack.dev — curated tools rated specifically for one-person operations"

**Twitter/X thread outline:**
```
1/ I built SoloStack.dev — a curated toolkit directory for solo founders.

2/ The problem: every "top startup tools" list is either:
   - Built for 10-person teams
   - Gaming Product Hunt
   - Outdated affiliate farms

3/ SoloStack is different: every tool gets a Solo Score (0-100) —
   "is this tool worth it if you're a team of one?"

4/ Current catalogue: 26 tools, 12 categories, 3 pre-built stacks:
   - $0 Launch Stack
   - 1-Day MVP Stack
   - Automation-First Stack

5/ Fully open source, zero auth required.
   solostack.dev
```

---

## Phase 2: Tool Vendor Outreach (Days 3–14)

### Email template to tool vendors:

```
Subject: [Tool Name] is listed on SoloStack.dev — Solo Score: [score]/100

Hi [name],

I launched SoloStack.dev — a curated directory for solo founders and indie hackers.
[Tool Name] is listed and rated [score]/100 for solo-founder fit.

We have open sponsor slots for categories — featured placement pinned at the top
of the [Category] page with a ✦ Sponsored badge. $199–$399/month per slot.

Interested? Reply to this email or visit solostack.dev/submit.

Best,
[Your name]
```

**Priority outreach targets (by category):**
- Payments: Stripe, Lemon Squeezy, Wise
- Hosting: Railway, Supabase, Vercel
- Email: Resend, Postmark
- Analytics: Plausible, Fathom, PostHog
- Marketing: Beehiiv, Typefully

---

## Phase 3: SEO Compounding (Weeks 2–12)

### Target keyword clusters:

**High-value comparison keywords (all have dedicated /compare/ pages):**
- "best payment tools for solo founders"
- "stripe alternatives for indie hackers"
- "best analytics for indie hackers"
- "supabase vs railway for solo founders"

**Long-tail tool keywords (each /tool/[slug] page targets):**
- "[tool name] review for indie hackers"
- "[tool name] solo founder review"
- "is [tool name] worth it for a solo founder"

**Category keywords (each /category/[slug] targets):**
- "best [category] tools for solo founders 2026"
- "indie hacker [category] stack"

### Content velocity target:
- Add 5 new tools/week via data/tools.json edits
- Weekly newsletter: "Stack of the Week" format
- Monthly: one long-form comparison post

---

## Phase 4: Newsletter Growth (Month 1+)

**Beehiiv setup steps:**
1. Create account at beehiiv.com (free tier)
2. Replace mailto form in /newsletter with Beehiiv embed
3. Set up welcome automation (2 email sequence)
4. Promote on every outbound post

**Target metrics:**
- Week 1: 50 subscribers (from launch posts)
- Month 1: 250 subscribers
- Month 3: 1,000 subscribers
- Month 6: 2,500 subscribers (Beehiiv free tier max)

---

## Phase 5: Revenue Activation

### Affiliate revenue (Day 1+):
- Fathom Analytics: 25% recurring commission
- Lemon Squeezy: affiliate program
- Beehiiv: $50 per paid referral
- Estimated Month 3: $50–$200/mo from 1,000 monthly visitors

### Sponsored listings (Month 2+):
- Target: 3 sponsors × $200/mo = $600/mo
- Sales approach: direct email to tool vendors (see template above)
- Estimated Month 6: $1,500–$3,000/mo at 5–10 sponsors

### Newsletter sponsorships (Month 4+):
- Target: 1 sponsor/week × $250/issue at 1,000 subs
- Estimated Month 6: $1,000/mo

---

## Metrics to Track (Weekly)

| Metric | Week 1 Target | Month 3 Target |
|--------|---------------|----------------|
| Unique visitors | 200 | 3,000 |
| /out/* clicks (affiliate) | 20 | 400 |
| Newsletter subscribers | 50 | 500 |
| Sponsor inquiries | 0 | 2 |
| Tools listed | 26 | 60 |

---

## Hard Stop Conditions (do not invest further until resolved)

- If < 100 visitors in first 2 weeks → revisit distribution, not the product
- If 0 affiliate clicks in first month → check /out/ redirect is working
- If 0 sponsor inquiries after 20 cold emails → test different subject line / offer

---
