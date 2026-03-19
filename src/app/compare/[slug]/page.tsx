import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getToolsByCategory } from '@/lib/data';
import SoloScoreBadge from '@/components/SoloScoreBadge';

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) return {};
  return {
    title: `Best ${cat.name} Tools for Solo Founders — Comparison`,
    description: `Compare all ${cat.name} tools for solo founders. Side-by-side Solo Scores, pricing, and features. Find the best ${cat.name} tool for your stage.`,
  };
}

export default async function ComparePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cat = categories.find(c => c.slug === slug);
  if (!cat) notFound();

  const catTools = getToolsByCategory(slug).sort((a, b) => b.soloScore - a.soloScore);

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="mb-4 text-sm text-gray-500">
        <Link href="/tools" className="hover:text-white">All Tools</Link>
        {' / '}
        <Link href={`/category/${cat.slug}`} className="hover:text-white">{cat.name}</Link>
        {' / '}Compare
      </div>

      <h1 className="text-4xl font-bold text-white mb-3">
        Best {cat.name} Tools for Solo Founders
      </h1>
      <p className="text-gray-400 mb-12 text-lg">
        {catTools.length} {cat.name.toLowerCase()} tools compared by Solo Score — our rating of how well each tool fits a one-person operation.
      </p>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left py-3 pr-6 text-gray-400 font-medium">Tool</th>
              <th className="text-left py-3 pr-6 text-gray-400 font-medium">Solo Score</th>
              <th className="text-left py-3 pr-6 text-gray-400 font-medium">Pricing</th>
              <th className="text-left py-3 pr-6 text-gray-400 font-medium">Model</th>
              <th className="text-left py-3 text-gray-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {catTools.map((tool, index) => (
              <tr key={tool.id} className={`border-b border-gray-800/50 hover:bg-gray-900/50 transition-colors ${index === 0 ? 'bg-indigo-900/10' : ''}`}>
                <td className="py-4 pr-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div>
                      <Link href={`/tool/${tool.slug}`} className="font-medium text-white hover:text-indigo-400 transition-colors">
                        {tool.name}
                      </Link>
                      {index === 0 && (
                        <div className="text-xs text-indigo-400 font-medium">Top Rated</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-4 pr-6">
                  <SoloScoreBadge score={tool.soloScore} size="sm" />
                </td>
                <td className="py-4 pr-6 text-gray-400">{tool.pricing}</td>
                <td className="py-4 pr-6">
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded capitalize">{tool.pricingType}</span>
                </td>
                <td className="py-4">
                  <a
                    href={`/out/${tool.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Visit →
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-12 text-center">
        <Link href={`/category/${cat.slug}`} className="text-indigo-400 hover:text-indigo-300 font-medium">
          ← Back to {cat.name} overview
        </Link>
      </div>
    </div>
  );
}
