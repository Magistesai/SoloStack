import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { categories, getToolsByCategory, getToolBySlug } from '@/lib/data';
import ToolCard from '@/components/ToolCard';
import SoloScoreBadge from '@/components/SoloScoreBadge';

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = categories.find(c => c.slug === params.slug);
  if (!cat) return {};
  return {
    title: `Best ${cat.name} Tools for Solo Founders`,
    description: `${cat.description}. Curated ${cat.name} tools rated by solo-founder fit. All options ranked by Solo Score.`,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const cat = categories.find(c => c.slug === params.slug);
  if (!cat) notFound();

  const catTools = getToolsByCategory(params.slug).sort((a, b) => b.soloScore - a.soloScore);
  const editorPick = getToolBySlug(cat.editorPick);
  const topScore = catTools[0]?.soloScore ?? 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <div className="mb-4 text-sm text-gray-500">
        <Link href="/tools" className="hover:text-white transition-colors">All Tools</Link>
        {' / '}{cat.name}
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-5xl">{cat.icon}</span>
        <div>
          <h1 className="text-4xl font-bold text-white">{cat.name}</h1>
          <p className="text-gray-400 mt-1">{cat.description}</p>
          <p className="text-gray-500 text-sm mt-1">{catTools.length} tool{catTools.length !== 1 ? 's' : ''} · top score {topScore}</p>
        </div>
      </div>

      {/* Sponsor slot or open slot */}
      {cat.sponsorSlot ? (
        <div className="bg-indigo-900/20 border border-indigo-700 rounded-xl p-4 mb-8 text-sm text-indigo-300 flex items-center gap-2">
          <span>✦</span>
          <span>This category is sponsored. <Link href="/about" className="underline hover:text-white">Learn about sponsorships.</Link></span>
        </div>
      ) : (
        <div className="bg-gray-900 border border-dashed border-gray-700 rounded-xl p-4 mb-8 flex items-center justify-between">
          <span className="text-sm text-gray-500">Open sponsor slot — featured placement at the top of this page.</span>
          <Link href="/submit" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium whitespace-nowrap">
            Sponsor this category →
          </Link>
        </div>
      )}

      {/* Editor's pick */}
      {editorPick && (
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-400">⭐</span>
            <span className="text-sm font-medium text-yellow-400 uppercase tracking-wide">Editor&apos;s Pick for {cat.name}</span>
          </div>
          <div className="max-w-sm">
            <ToolCard tool={editorPick} />
          </div>
        </div>
      )}

      {/* All tools */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          All {cat.name} Tools
          <span className="text-gray-500 font-normal text-lg ml-2">({catTools.length})</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {catTools.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>

      {/* Compare CTA */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm mb-3">Comparing options?</p>
        <Link
          href={`/compare/${cat.slug}`}
          className="text-indigo-400 hover:text-indigo-300 font-medium"
        >
          Compare all {cat.name} tools →
        </Link>
      </div>
    </div>
  );
}
