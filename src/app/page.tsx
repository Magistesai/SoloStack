import Link from 'next/link';
import { tools, categories, getFeaturedTools, getToolsByCategory } from '@/lib/data';
import ToolCard from '@/components/ToolCard';

export default function HomePage() {
  const featured = getFeaturedTools().slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">

      {/* Hero */}
      <section className="text-center mb-20">
        <div className="inline-flex items-center gap-2 bg-indigo-900/30 text-indigo-400 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-indigo-800/50">
          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
          {tools.length}+ tools rated by solo-founder fit
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
          The opinionated toolkit<br />
          <span className="text-indigo-400">for builders who ship alone.</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          No enterprise bloat. No gameable ratings. Just the tools solo founders actually use — curated with an honest editorial voice and a 0–100 Solo Score.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/tools" className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-colors text-lg shadow-lg shadow-indigo-900/30">
            Browse All Tools
          </Link>
          <Link href="/stacks" className="border border-gray-700 hover:border-indigo-500 text-gray-300 hover:text-white px-8 py-3.5 rounded-xl font-semibold transition-colors text-lg">
            View Stack Bundles
          </Link>
        </div>
        <div className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-500">
          <span>✓ {tools.length} tools curated</span>
          <span>✓ {categories.length} categories</span>
          <span>✓ No signup required</span>
        </div>
      </section>

      {/* Newsletter CTA bar */}
      <section className="bg-gradient-to-r from-indigo-900/30 to-purple-900/20 border border-indigo-800/50 rounded-2xl p-8 mb-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">The Solo Stack Weekly</h2>
            <p className="text-gray-400">One founder&apos;s stack, three tool reviews, one automation tip — every week.</p>
          </div>
          <Link href="/newsletter" className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex-shrink-0">
            Subscribe Free →
          </Link>
        </div>
      </section>

      {/* Editor's picks */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Editor&apos;s Picks</h2>
            <p className="text-gray-500 text-sm mt-1">Highest Solo Scores across all categories</p>
          </div>
          <Link href="/tools" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">
            View all {tools.length} tools →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Category grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(cat => {
            const count = getToolsByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-xl p-5 transition-all hover:shadow-md hover:shadow-indigo-900/20 group"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <div className="font-semibold text-white group-hover:text-indigo-400 transition-colors text-sm">{cat.name}</div>
                <div className="text-xs text-gray-500 mt-1">{count} tool{count !== 1 ? 's' : ''}</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Stack bundles teaser */}
      <section className="mt-20 bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-indigo-400 text-sm font-medium mb-2">Curated Stacks</div>
            <h2 className="text-2xl font-bold text-white mb-2">Pre-built tool stacks for solo founders</h2>
            <p className="text-gray-400">The $0 Launch Stack. The 1-Day MVP Stack. The Automation-First Stack. Ordered tools with rationale — not just lists.</p>
          </div>
          <Link href="/stacks" className="whitespace-nowrap border border-indigo-600 text-indigo-400 hover:bg-indigo-600 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all flex-shrink-0">
            View All Stacks →
          </Link>
        </div>
      </section>

    </div>
  );
}
