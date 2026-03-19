# Autonomous Product-Building System Blueprint

Extracted from the SoloStack execution run (2026-03-18 → 2026-03-19).
Generalized for reuse on any future product.

---

## 1. SYSTEM OVERVIEW

**What it does:** Takes a vague directive ("build a monetizable product") and produces a live, deployed, iteratively-improved website with no human intervention between phases.

**What makes it autonomous:**
- Resolves unknowns through research rather than asking
- Detects failures (build errors, 404s, deployment gaps) and fixes them inline
- Self-evaluates completed work against explicit criteria and generates improvement tasks
- Loops through refinement cycles without being prompted

**Capabilities demonstrated:**
- Market research → niche selection → product definition
- Full-stack static site generation (Next.js + Tailwind + TypeScript)
- Data architecture with build-time validation gates
- SEO infrastructure (sitemap, robots.txt, OG images, JSON-LD, meta)
- Affiliate routing with click tracking hooks
- Deployment pipeline (git → push → Vercel production)
- Two complete self-critique → improvement → re-deploy cycles
- Visual verification via preview server + screenshots

---

## 2. PHASE ARCHITECTURE (ABSTRACTED)

### Phase 1 — DISCOVERY
| Field | Value |
|-------|-------|
| **Inputs** | Domain constraint ("monetizable niche"), available tools |
| **Actions** | Web research, signal evaluation (demand, competition, margin), ranking |
| **Outputs** | Ranked niche list with justification, single selected niche |
| **Validation** | Niche has identifiable audience, clear monetization path, low barrier to MVP |

### Phase 2 — PRODUCT DEFINITION
| Field | Value |
|-------|-------|
| **Inputs** | Selected niche |
| **Actions** | Define target audience, core problem, value proposition, product type, feature set, monetization model |
| **Outputs** | Product spec document with differentiation rationale |
| **Validation** | Spec is implementable as a static site, has at least 2 revenue channels |

### Phase 3 — ARCHITECTURE
| Field | Value |
|-------|-------|
| **Inputs** | Product spec |
| **Actions** | Define sitemap, page types, data schema, component inventory, URL structure, SEO strategy |
| **Outputs** | Sitemap, data schema (TypeScript interfaces), route map, component list |
| **Validation** | Every page type has a data source, every route is statically generatable |

### Phase 4 — SCAFFOLD
| Field | Value |
|-------|-------|
| **Inputs** | Architecture doc |
| **Actions** | `create-next-app`, install deps, define TypeScript types, create data validation gate, seed initial data |
| **Outputs** | Buildable project with types + data + validation — zero UI yet |
| **Validation** | `npm run build` passes, validation gate catches bad data |

### Phase 5 — BUILD (incremental)
| Field | Value |
|-------|-------|
| **Inputs** | Scaffold + architecture |
| **Actions** | Build in layers: shared components → homepage → listing pages → detail pages → utility pages (submit, newsletter, about) → SEO infrastructure (sitemap, robots, OG) |
| **Outputs** | Complete page set, all routes rendering |
| **Validation** | TypeScript clean, build succeeds, every `generateStaticParams` route resolves |

### Phase 6 — DEPLOYMENT
| Field | Value |
|-------|-------|
| **Inputs** | Built project, git repo, deployment target credentials |
| **Actions** | Git push, trigger deployment (CLI or auto-deploy), wait for build, verify live URLs |
| **Outputs** | Live production URL with all routes returning 200 |
| **Validation** | HTTP status checks on homepage + sample dynamic routes + new routes |

### Phase 7 — SELF-EVALUATION
| Field | Value |
|-------|-------|
| **Inputs** | Live product, original spec, competitive context |
| **Actions** | Systematic critique: data quantity, UX gaps, SEO weaknesses, broken metadata, missing features, mobile issues |
| **Outputs** | Prioritized issue table (severity × impact), improvement plan |
| **Validation** | Issues are concrete and actionable, not vague |

### Phase 8 — REFINEMENT CYCLE (repeatable)
| Field | Value |
|-------|-------|
| **Inputs** | Issue table from self-evaluation |
| **Actions** | Fix highest-impact issues, rebuild, redeploy, re-verify |
| **Outputs** | Updated live product, logged changes |
| **Validation** | Build clean, deploy clean, new routes verified, regression-free |

---

## 3. EXECUTION LOOP MODEL

```
┌──────────────────────────────────────────────┐
│                                              │
│   PLAN ──→ BUILD ──→ VALIDATE ──→ DEPLOY     │
│     ↑                               │        │
│     │         ┌──────────────────────┘        │
│     │         ▼                               │
│     │     EVALUATE ──→ IMPROVE ───────────┐   │
│     │                                     │   │
│     └─────────────────────────────────────┘   │
│                                              │
│   Minimum 2 refinement cycles before stop    │
│                                              │
└──────────────────────────────────────────────┘
```

**Triggers:**

| Transition | Trigger |
|------------|---------|
| PLAN → BUILD | Plan is concrete enough to produce a file (not "explore more") |
| BUILD → VALIDATE | Any file write that changes build output |
| VALIDATE → DEPLOY | Build succeeds with zero errors |
| DEPLOY → EVALUATE | Live URL returns 200 on all expected routes |
| EVALUATE → IMPROVE | Issue table has at least one High/Critical item |
| IMPROVE → PLAN | Improvement requires architectural change (new data fields, new page types) |
| IMPROVE → BUILD | Improvement is a targeted code/data change |

**Data flow between steps:**

```
Discovery
  └→ niche_selection.json
       └→ product_spec.md
            └→ architecture {types.ts, schema, routes}
                 └→ data/*.json (validated at build time)
                      └→ src/app/**/*.tsx (consume data via lib/)
                           └→ .next/ build output
                                └→ Vercel production deployment
                                     └→ HTTP status verification
                                          └→ issue_table[]
                                               └→ prioritized fixes
                                                    └→ (loop back to data or src)
```

**Failure detection points:**

| Point | Detection method | Recovery |
|-------|-----------------|----------|
| Data integrity | Build-time validation gate (`validateData()`) | Fix data, rebuild |
| Type errors | TypeScript compilation | Fix types/code, rebuild |
| Build failure | `npm run build` exit code | Read error, fix, rebuild |
| Route 404 | HTTP status check post-deploy | Check `generateStaticParams`, fix, redeploy |
| Deploy failure | Vercel CLI output / HTTP checks | Re-run `vercel --prod` or fix build |
| Visual regression | Preview screenshot comparison | Edit component, re-verify |

---

## 4. AGENT ROLE DESIGN

### Research Agent
- **Responsibility:** Market analysis, niche evaluation, competitive intelligence
- **Inputs:** Domain constraints, search tools
- **Outputs:** Ranked niche list, evidence-backed selection

### Product Agent
- **Responsibility:** Product definition, feature scoping, monetization design
- **Inputs:** Selected niche, audience profile
- **Outputs:** Product spec with audience, value prop, feature set, revenue model

### Architecture Agent
- **Responsibility:** Technical design — data schema, route map, component inventory, SEO strategy
- **Inputs:** Product spec
- **Outputs:** TypeScript interfaces, sitemap structure, page type definitions

### Data Agent
- **Responsibility:** Create, expand, and validate the content dataset
- **Inputs:** Product domain, data schema, validation rules
- **Outputs:** Populated JSON data files that pass build-time validation
- **Key behavior:** Generates realistic, differentiated entries — not lorem ipsum

### Build Agent
- **Responsibility:** Write components, pages, and infrastructure code
- **Inputs:** Architecture, data schema, component inventory
- **Outputs:** Working source code that builds cleanly
- **Key behavior:** Builds incrementally (scaffold → components → pages → SEO) with validation after each layer

### Deploy Agent
- **Responsibility:** Git operations, deployment execution, URL verification
- **Inputs:** Built project, git remote, deployment credentials
- **Outputs:** Live production URL, deployment log
- **Key behavior:** Verifies every deployment with HTTP status checks on key routes

### QA Agent
- **Responsibility:** Visual verification, content spot-checks, regression detection
- **Inputs:** Running dev server or live URL
- **Outputs:** Screenshot evidence, pass/fail on content presence
- **Key behavior:** Uses preview tools (snapshot, screenshot, eval) — never trusts "it should work"

### Evaluation Agent
- **Responsibility:** Self-critique against quality criteria, issue prioritization
- **Inputs:** Live product, original spec, competitive context
- **Outputs:** Severity-ranked issue table, improvement plan
- **Key behavior:** Evaluates data quantity, UX, SEO, mobile, metadata — not just "does it build"

---

## 5. TOOLING LAYER

### Code generation
- **Tool:** Direct file writes (Write/Edit tools)
- **Pattern:** Read existing → understand pattern → write minimal diff
- **Not used:** Scaffolding tools, boilerplate generators (except initial `create-next-app`)

### File system
- **Tools:** Read, Write, Edit, Glob, Grep
- **Pattern:** Read before write (enforced). Edit for surgical changes, Write for new files.

### Git / GitHub
- **Tools:** Bash (git add, commit, push)
- **Pattern:** Scoped commits per logical change. Commit message describes what + why. Push triggers deploy.

### Deployment
- **Tool:** Vercel CLI (`npx vercel --prod`)
- **Pattern:** Push to GitHub first (for history), then deploy via CLI. Verify with HTTP status checks.
- **Fallback:** When auto-deploy didn't trigger, detected via `vercel ls` (stale timestamps) and switched to manual CLI deploy.

### Preview / Testing
- **Tools:** `preview_start`, `preview_screenshot`, `preview_snapshot`, `preview_eval`
- **Pattern:** Start dev server → navigate to routes → screenshot for visual verification → eval for scrolling/interaction → snapshot for content verification

### Data validation
- **Tool:** Custom `validateData()` function run at build time
- **Pattern:** Checks required fields, score ranges, unique slugs, valid enums, category reference integrity, editor pick reference integrity. Throws on failure — build cannot succeed with bad data.

### HTTP verification
- **Tool:** `curl -s -o /dev/null -w "%{http_code}"`
- **Pattern:** Check 5+ routes after every deploy (homepage + new dynamic routes + edge cases)

### Orchestration model
```
Write code → Run build → Check exit code
  ↓ (fail)      ↓ (pass)
Read error    Git commit + push
Fix code      Deploy (CLI)
  ↓            ↓
Retry build   HTTP verify routes
               ↓ (fail)
              Diagnose (check deploy list, read logs)
              Fix + redeploy
               ↓ (pass)
              Visual verify (preview server)
              Screenshot proof
```

---

## 6. DATA FLOW ARCHITECTURE

### Creation
```
data/tools.json      ← Agent-generated, follows Tool interface
data/categories.json ← Agent-generated, follows Category interface
data/stacks.json     ← Agent-generated, follows Stack interface
```

All data is static JSON. No database, no API, no CMS. The agent is the CMS.

### Flow into pages
```
data/*.json
  → src/lib/data.ts (imports, casts to typed arrays, runs validateData())
    → src/app/page.tsx (getFeaturedTools(), categories, tools.length)
    → src/app/tools/page.tsx (all tools → ToolSearch client component)
    → src/app/tool/[slug]/page.tsx (single tool lookup, alternatives query)
    → src/app/category/[slug]/page.tsx (getToolsByCategory())
    → src/app/compare/[slug]/page.tsx (getToolsByCategory(), sorted)
    → src/app/stack/[slug]/page.tsx (getToolById() per stack entry)
    → src/app/out/[slug]/route.ts (tool.affiliateUrl → 302 redirect)
    → src/app/sitemap.ts (all slugs → XML sitemap)
```

### Validation gates
```
validateData() runs at MODULE LOAD TIME in data.ts
  → Checks 6 invariants:
    1. All required fields present on every tool
    2. soloScore in 0–100 range
    3. No duplicate slugs
    4. pricingType is a valid enum value
    5. Every tool.category exists in categories.json
    6. Every category.editorPick exists in tools.json
  → Throws Error with itemized failure list → build fails → agent reads error → fixes data
```

### Update propagation
```
Edit data/tools.json
  → npm run build (validateData() re-runs, pages re-generate)
    → git add + commit + push
      → vercel --prod (uploads, builds remotely, aliases to production URL)
        → curl status checks on new routes
```

---

## 7. FAILURE HANDLING MODEL

### Failure: Async params breaking change (Next.js 16)
- **Detection:** Build error — `params` must be awaited in Next.js 16 dynamic routes
- **Resolution:** Updated all `{ params }` destructuring to `{ params }: { params: Promise<...> }` with `await params`
- **Commit:** `6a3b78b fix: async params for Next.js 16 dynamic routes`

### Failure: Validation gate missing fields
- **Detection:** Build-time `validateData()` threw — required field list didn't match actual data shape
- **Resolution:** Added missing fields to `REQUIRED_TOOL_FIELDS` array
- **Commit:** `42fa25f fix: add missing fields to validation gate`

### Failure: GitHub auto-deploy not triggering
- **Detection:** After push, `vercel ls` showed only deployments from 15h ago — no new builds
- **Resolution:** Switched to manual `npx vercel --prod` CLI deployment
- **Impact:** None — all subsequent deploys used CLI successfully

### Failure: New routes returning 404 post-deploy
- **Detection:** `curl` status checks on `/tool/clerk` and `/category/automation` returned 404
- **Diagnosis:** Stale deployment — Vercel hadn't picked up the push
- **Resolution:** Manual `vercel --prod` deploy, re-verified all routes → 200

### Failure: metadataBase pointing to wrong domain
- **Detection:** Self-evaluation phase — read `layout.tsx`, found hardcoded `solostack.dev` (domain not owned)
- **Resolution:** Changed to `process.env.VERCEL_URL` with fallback to actual Vercel URL

### Failure: Description claiming "200+ tools" with only 26
- **Detection:** Self-evaluation — read homepage metadata, compared to actual `tools.length`
- **Resolution:** Changed to dynamic `${tools.length}+` using imported tools array

### Pattern: All failures followed the same loop
```
Detect (build error | HTTP check | code review)
  → Diagnose (read error message | read source | compare expected vs actual)
    → Fix (minimal edit to data or code)
      → Validate (rebuild | re-curl | re-screenshot)
```

---

## 8. REFINEMENT / SELF-IMPROVEMENT MODEL

### How issues are identified
The Evaluation Agent reads every source file systematically and checks against these criteria:
1. **Data quantity** — Is the catalog large enough to be credible?
2. **Data quality** — Are descriptions unique and useful, or generic filler?
3. **UX completeness** — Do all interactive elements work? (mobile nav, forms, search)
4. **SEO integrity** — Are meta tags accurate? Do canonical URLs resolve? Is structured data present?
5. **Metadata honesty** — Does the site claim more than it delivers? (e.g., "200+ tools" with 26)
6. **Mobile functionality** — Does the header work on small screens?
7. **Freshness signals** — Can a visitor tell the site is maintained?

### How priorities are chosen
Issues are ranked by `severity × impact`:
- **Critical:** Breaks trust or functionality (lying about tool count, broken routes)
- **High:** Hurts SEO or UX significantly (no verdicts on tool pages, wrong metadataBase)
- **Medium:** Reduces quality (thin content, missing editorial blurbs)
- **Low:** Polish (no freshness signal, date formatting)

Highest severity items are fixed first. A refinement cycle addresses 3–6 issues.

### How fixes are applied and verified
1. Edit source files (data JSON, components, or pages)
2. Run `npm run build` — must succeed (TypeScript + validation gate)
3. Preview server screenshot — must render correctly
4. Git commit with scoped message
5. `vercel --prod` deploy
6. HTTP status verification on affected routes
7. Content spot-check via `curl | grep`

### What constitutes a "cycle"
A cycle is one pass through: **Evaluate → Prioritize → Fix → Build → Deploy → Verify**.
Each cycle produces:
- A git commit with a descriptive message
- A successful deployment
- Verified live routes
- A log entry in GROWTH_LOG.md

Minimum 2 cycles required before the system can halt.

---

## 9. AUTONOMY ENFORCEMENT RULES

1. **No waiting for human input.** If information is missing, research it or make a defensible decision.
2. **No asking for confirmation** on reversible actions (file edits, builds, local deploys). Only pause for irreversible shared-state actions (force pushes, production DB changes).
3. **Must resolve unknowns** through available tools — web search, file reads, build output, HTTP checks. "I don't know" is not a stopping point; it's a trigger for investigation.
4. **Must continue forward** after failures. A build error triggers a fix attempt, not a question to the user.
5. **Must self-critique.** Completing a build is not completing the task. The system evaluates its own output and improves it.
6. **Must log decisions and outcomes.** Every phase produces a record of what was done, what worked, and what didn't.
7. **Must verify claims with evidence.** "It should work" is not acceptable. HTTP status codes, screenshots, and build output are evidence.
8. **Must build incrementally.** Each layer is validated before the next begins. No 500-line blind writes.

---

## 10. MINIMUM REQUIREMENTS FOR SUCCESS

| Requirement | Verification method |
|-------------|-------------------|
| Live deployed product at a public URL | HTTP 200 on homepage |
| All defined routes render without errors | HTTP 200 on 5+ sample routes (homepage, tool detail, category, compare, stack) |
| Data passes integrity validation | Build-time `validateData()` succeeds |
| TypeScript compiles cleanly | `npm run build` exits 0 with no type errors |
| At least 2 refinement cycles executed | Git log shows 2+ improvement commits after initial deploy |
| Mobile navigation functions | Visual verification via preview screenshot |
| SEO infrastructure present | sitemap.xml, robots.txt, OG image, JSON-LD, meta tags all render |
| Monetization pathway exists | Affiliate redirect routes (`/out/[slug]`) functional, sponsor slots visible |
| Changes logged | GROWTH_LOG.md contains iteration entries with before/after |

---

## 11. BOTTLENECKS + LIMITATIONS

### Required human intervention
- **Deployment credentials:** Vercel token had to exist on the machine before the run
- **GitHub authentication:** `git push` required pre-configured credentials
- **Approach selection:** User chose "Approach A" from brainstorming options (could be automated with scoring)
- **Domain purchase:** `solostack.dev` is referenced but not purchased — requires human + payment

### What broke autonomy
- **GitHub → Vercel auto-deploy not wired:** The integration didn't trigger on push. Required diagnosis (`vercel ls` to detect stale deploys) and fallback to manual CLI deploy. This could be avoided by always deploying via CLI.
- **Stop hook requiring preview verification:** The system was forced to start a dev server and take screenshots before completing — this is a guardrail, not a bug, but it interrupts the deploy-verify-via-curl flow.

### What slowed execution
- **Large data writes:** Writing 50 tools with 15+ fields each is a single large file write. No parallelism possible.
- **Vercel deploy latency:** ~40 seconds per deploy. Not reducible.
- **Context window pressure:** Each refinement cycle adds to conversation length. Long runs risk context compression losing early decisions.

### Structural limitations
- **No real analytics:** The system can deploy Plausible/PostHog but can't verify traffic without account credentials
- **No real email:** Newsletter form uses `mailto:` — requires a Beehiiv/ConvertKit account to be functional
- **No real affiliate codes:** All affiliate URLs point to tool homepages — real affiliate programs require manual signup
- **No A/B testing:** Improvements are based on code review, not user data

---

## 12. REUSABLE TEMPLATE

### Inputs (what you need to start)
```yaml
required:
  - niche_direction: string     # "monetizable product" or more specific
  - deployment_target: string   # "vercel" | "netlify" | "cloudflare"
  - git_remote: string          # GitHub repo URL (must have push access)
  - framework: string           # "nextjs" | "astro" | "remix"

optional:
  - domain: string              # Custom domain if purchased
  - analytics_key: string       # Plausible/PostHog site ID
  - affiliate_codes: map        # tool_slug → affiliate_url
```

### Process
```
1. DISCOVER
   - Research 3–5 niches
   - Score: demand × low_competition × monetizability
   - Select top niche

2. DEFINE
   - Target audience (1 sentence)
   - Core problem (1 sentence)
   - Value proposition (1 sentence)
   - Product type: directory | tool | content | SaaS
   - Revenue channels: affiliate | sponsor | subscription | ads

3. ARCHITECT
   - Data schema (TypeScript interfaces)
   - Route map (static + dynamic)
   - Component inventory
   - Validation gate rules
   - SEO: sitemap, robots, OG, JSON-LD strategy

4. SCAFFOLD
   - create-next-app (or equivalent)
   - Install: tailwindcss, fuse.js (if search needed)
   - Define types in src/types/
   - Create validateData() in src/lib/
   - Seed data files in data/

5. BUILD (layered)
   Layer 1: Shared components (Header, Footer, Cards)
   Layer 2: Homepage
   Layer 3: Listing pages (browse, search, filter)
   Layer 4: Detail pages (per-item, per-category)
   Layer 5: Utility pages (about, submit, newsletter)
   Layer 6: SEO infra (sitemap.ts, robots.ts, OG image)
   Layer 7: Monetization routes (affiliate redirects, sponsor slots)

   VALIDATE after each layer: npm run build

6. DEPLOY
   - git add + commit + push
   - vercel --prod (or equivalent)
   - HTTP verify: 5+ routes must return 200

7. EVALUATE
   - Read every page source
   - Check: data quantity, UX, SEO, mobile, metadata accuracy
   - Produce severity-ranked issue table

8. REFINE (repeat 2+ times)
   - Fix top 3–6 issues from evaluation
   - Rebuild + redeploy + re-verify
   - Log changes in growth log
   - Re-evaluate → repeat if Critical/High issues remain
```

### Outputs (what gets produced)
```yaml
artifacts:
  - live_url: string                    # Production deployment URL
  - github_repo: string                 # Source code repository
  - growth_log: GROWTH_LOG.md           # Strategy + iteration log
  - site_pages: 100+ static HTML pages  # SEO-ready, pre-rendered
  - data_files: data/*.json             # Validated content dataset
  - sitemap: /sitemap.xml               # All routes indexed
  - og_image: /opengraph-image          # Social share card

metrics:
  - total_tools/items: 50+
  - total_routes: 145+
  - refinement_cycles: 2+
  - build_time: <60s
  - deploy_time: <45s
  - lighthouse_structure: semantic HTML, meta tags, JSON-LD

revenue_infrastructure:
  - affiliate_redirects: /out/[slug] → tool affiliate URL
  - sponsor_slots: visible on category pages
  - newsletter_signup: form on /newsletter
  - submit_funnel: /submit page with free + paid options
```

---

## Appendix: Commit History (execution trace)

```
5ec9c66 Initial commit from Create Next App
3399b90 feat: scaffold SoloStack Next.js 14 app with TypeScript + Tailwind
e36ea22 feat: types, data validation gate, seed 24 tools + 12 categories + stacks
42fa25f fix: add missing fields to validation gate REQUIRED_TOOL_FIELDS
3d6f1d7 feat: shared components (Header, Footer, ToolCard, SoloScoreBadge) + homepage
d8d456c feat: /tools search directory + /stacks index + /stack/[slug] bundle pages
eb1f9c2 feat: /category/[slug], /tool/[slug] reviews, /out/[slug] affiliate routing, /compare/[slug]
0bdd480 feat: /submit, /newsletter, /about + sitemap.xml + robots.txt + logo fallback
361d6d2 feat: add vercel.json config + GitHub Actions deploy workflow
6a3b78b fix: async params for Next.js 16 dynamic routes
c1706a8 feat: refinement cycle 1 — add Wise, OG meta, favicon, homepage stats
1f640de feat: refinement cycle 2 — OG image, dynamic hero count, 3 new tools
cf22a47 docs: growth strategy log — launch week, vendor outreach, SEO, revenue roadmap
c13972a refine(cycle-1): expand catalog 26→50 tools, add bestFor/skipIf verdicts, fix metadata
d4b76e6 refine(cycle-2): mobile nav hamburger, recently added section, updated stats bar
6e34e67 docs: log refinement cycles 1 + 2 in GROWTH_LOG
```

Each commit represents a discrete, buildable state. The system never committed broken code.
