// src/app/about/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { tools, categories } from '@/lib/data';

export const metadata: Metadata = {
  title: 'About',
  description: 'SoloStack is an opinionated, curated toolkit directory for solo founders. We rate every tool specifically for solo-founder fit.',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-10">About SoloStack</h1>

      <div className="space-y-8 text-gray-300 leading-relaxed">
        <div>
          <p className="text-lg">Product Hunt is gameable. G2 is for enterprise buyers. Every &quot;top tools&quot; listicle is either outdated or affiliate-farmed with no real opinion behind it.</p>
        </div>

        <div>
          <p>SoloStack exists because solo founders deserve an honest, opinionated resource — not a list of every tool that exists, but a curated set of the tools that actually work when you&apos;re building alone.</p>
        </div>

        <div>
          <p>Every tool is evaluated on one question: <strong className="text-white">does this tool make life better for a solo founder?</strong> Tools that are powerful but require a team to configure, or cheap but unreliable at launch — they don&apos;t make the cut.</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">The Solo Score</h2>
          <p className="mb-4">Every tool gets a Solo Score from 0–100. It&apos;s not &quot;is this a good tool&quot; — it&apos;s &quot;is this the right tool for someone who is one person building a product.&quot;</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-3">
              <span className="w-16 text-center bg-green-900/60 text-green-300 border border-green-700 rounded-full px-2 py-0.5 text-xs font-medium">71–100</span>
              <span className="text-gray-400">Excellent — built for or ideal for solo founders</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-center bg-yellow-900/60 text-yellow-300 border border-yellow-700 rounded-full px-2 py-0.5 text-xs font-medium">41–70</span>
              <span className="text-gray-400">Good — works well but has friction points for solos</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-16 text-center bg-red-900/60 text-red-300 border border-red-700 rounded-full px-2 py-0.5 text-xs font-medium">0–40</span>
              <span className="text-gray-400">Listed for completeness but not recommended for solos</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">Sponsorships</h2>
          <p className="mb-3">Sponsorships keep SoloStack free. Sponsored tools are clearly marked with ✦. We only accept sponsors whose tools we&apos;d recommend anyway — we won&apos;t list tools that don&apos;t meet our solo-fit bar regardless of budget.</p>
          <p>Interested in a sponsor slot? <a href="mailto:hello@solostack.dev" className="text-indigo-400 hover:underline">Email us</a> or <Link href="/submit" className="text-indigo-400 hover:underline">use the submit form</Link>.</p>
        </div>

        <div className="text-sm text-gray-500 border-t border-gray-800 pt-6">
          <h2 className="text-white font-medium mb-2">Affiliate Disclosure</h2>
          <p>Some tool links earn us a commission if you subscribe. These are marked with affiliate parameters. Affiliate relationships never influence our Solo Scores or editorial ratings.</p>
        </div>

        <div className="text-sm text-gray-500 border-t border-gray-800 pt-6">
          <p>{tools.length} tools across {categories.length} categories. Updated weekly.</p>
        </div>
      </div>
    </div>
  );
}
