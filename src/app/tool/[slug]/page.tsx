import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { tools, getCategoryBySlug, getToolsByCategory } from '@/lib/data';
import SoloScoreBadge from '@/components/SoloScoreBadge';
import ToolCard from '@/components/ToolCard';

export async function generateStaticParams() {
  return tools.map(t => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);
  if (!tool) return {};
  return {
    title: `${tool.name} Review for Solo Founders`,
    description: `Is ${tool.name} worth it for solo founders? Honest review, pricing, and alternatives. Solo Score: ${tool.soloScore}/100.`,
    openGraph: {
      title: `${tool.name} — SoloStack Review`,
      description: tool.tagline,
    },
  };
}

export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);
  if (!tool) notFound();

  const category = getCategoryBySlug(tool.category);
  const alternatives = getToolsByCategory(tool.category)
    .filter(t => t.id !== tool.id)
    .sort((a, b) => b.soloScore - a.soloScore)
    .slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: tool.category,
    offers: {
      '@type': 'Offer',
      price: tool.pricingType === 'free' ? '0' : undefined,
      priceCurrency: 'USD',
      description: tool.pricing,
    },
  };

  const bandColor = tool.soloScore >= 71 ? 'text-green-400' : tool.soloScore >= 41 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <div className="mb-6 text-sm text-gray-500">
        <Link href="/tools" className="hover:text-white">All Tools</Link>
        {category && (
          <>{' / '}<Link href={`/category/${category.slug}`} className="hover:text-white">{category.name}</Link></>
        )}
        {' / '}{tool.name}
      </div>

      {/* Hero */}
      <div className="flex items-start gap-5 mb-8">
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-800 border border-gray-700 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tool.logo} alt={`${tool.name} logo`} className="w-full h-full object-contain p-2" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 flex-wrap mb-2">
            <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
            <SoloScoreBadge score={tool.soloScore} size="lg" />
          </div>
          <p className="text-gray-400 text-lg">{tool.tagline}</p>
        </div>
      </div>

      {/* Score callout */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-gray-400 font-medium">Solo Score</span>
          <span className={`text-3xl font-bold ${bandColor}`}>{tool.soloScore}<span className="text-lg text-gray-600">/100</span></span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${tool.soloScore >= 71 ? 'bg-green-500' : tool.soloScore >= 41 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${tool.soloScore}%` }}
          />
        </div>
        <p className="text-gray-500 text-xs mt-2">Rated specifically for solo-founder use — not general popularity or enterprise features.</p>
      </div>

      {/* Metadata grid */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8 grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-gray-500 mb-1">Pricing</div>
          <div className="text-white font-medium">{tool.pricing}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Model</div>
          <div className="text-white font-medium capitalize">{tool.pricingType}</div>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Category</div>
          <Link href={`/category/${tool.category}`} className="text-indigo-400 hover:text-indigo-300 font-medium capitalize">
            {category?.name ?? tool.category}
          </Link>
        </div>
        <div>
          <div className="text-gray-500 mb-1">Added</div>
          <div className="text-white font-medium">{tool.addedDate}</div>
        </div>
      </div>

      {/* Review */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Solo Founder Review</h2>
        <p className="text-gray-300 leading-relaxed text-base">{tool.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tool.tags.map(tag => (
            <span key={tag} className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex gap-3 mb-16">
        <a
          href={`/out/${tool.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl font-semibold transition-colors text-lg"
        >
          Visit {tool.name} →
        </a>
        {category && (
          <Link href={`/compare/${category.slug}`} className="border border-gray-700 hover:border-indigo-500 text-gray-400 hover:text-white px-5 py-3 rounded-xl font-medium transition-colors text-sm">
            Compare alternatives
          </Link>
        )}
      </div>

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-white mb-5">
            Alternatives in {category?.name}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alternatives.map(alt => (
              <ToolCard key={alt.id} tool={alt} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
