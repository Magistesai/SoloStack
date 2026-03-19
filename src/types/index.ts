export type PricingType = 'free' | 'freemium' | 'paid' | 'usage' | 'open-source';

export interface Tool {
  id: string;
  name: string;
  slug: string;
  category: string;          // must match a category slug
  tagline: string;
  description: string;
  url: string;
  affiliateUrl: string;
  logo: string;
  pricing: string;           // human-readable e.g. "Free / $25/mo"
  pricingType: PricingType;
  soloScore: number;         // 0–100 (NOT 1–5)
  featured: boolean;
  sponsored: boolean;
  tags: string[];
  addedDate: string;         // ISO date YYYY-MM-DD
  bestFor?: string;          // one-line "best for: ..." verdict
  skipIf?: string;           // one-line "skip if: ..." verdict
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  editorPick: string;        // tool id
  sponsorSlot: string | null;
}

export interface Stack {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  tools: StackTool[];        // ordered list
  addedDate: string;
}

export interface StackTool {
  toolId: string;
  role: string;              // "Payments", "Auth", etc.
  note: string;              // why this tool in this stack
}

export interface ComparisonPage {
  slug: string;
  title: string;
  description: string;
  category: string;
  toolIds: string[];         // tools to compare
}
