// src/app/submit/page.tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Submit a Tool',
  description: 'Submit a tool to SoloStack for review. We evaluate every submission for solo-founder fit before listing.',
};

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-white mb-4">Submit a Tool</h1>
      <p className="text-gray-400 mb-8 text-lg">
        Know a tool solo founders should know about? Submit it for review. We evaluate every tool for solo-founder fit before listing.
      </p>

      <div className="space-y-6">
        {/* Submission options */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-white mb-6">Submission Options</h2>

          <div className="space-y-4">
            <div className="bg-gray-800/50 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-1">Free Listing</h3>
              <p className="text-gray-400 text-sm mb-3">Submit your tool for review. We add tools that genuinely fit solo founders. No fee, no guaranteed listing.</p>
              <a
                href="mailto:hello@solostack.dev?subject=Tool Submission&body=Tool name:%0AWebsite URL:%0APricing:%0AWhy solo founders love it:"
                className="inline-block bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Submit via Email →
              </a>
            </div>

            <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-white">Sponsored Listing</h3>
                <span className="text-xs bg-indigo-600 text-white px-2 py-0.5 rounded-full">$199–$399/mo</span>
              </div>
              <p className="text-gray-400 text-sm mb-3">Featured placement at the top of your category page with a ✦ Sponsored badge. Includes a &quot;Sponsor this category&quot; slot visible to all visitors.</p>
              <a
                href="mailto:hello@solostack.dev?subject=Sponsorship Inquiry&body=Company:%0ACategory interested in:%0AMonthly budget:"
                className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Inquire About Sponsorship →
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-sm text-gray-400">
          <h3 className="text-white font-medium mb-2">Our evaluation criteria</h3>
          <ul className="space-y-1.5">
            <li>✓ Works well for a team of one (not just enterprises)</li>
            <li>✓ Has a meaningful free tier or reasonable pricing for early-stage</li>
            <li>✓ Doesn&apos;t require a DevOps team to set up</li>
            <li>✓ Actively maintained with responsive support</li>
            <li>✓ Not already better-covered by an existing listing</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
