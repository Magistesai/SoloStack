import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { stacks, getToolById } from '@/lib/data';
import SoloScoreBadge from '@/components/SoloScoreBadge';

export async function generateStaticParams() {
  return stacks.map(s => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const stack = stacks.find(s => s.slug === params.slug);
  if (!stack) return {};
  return {
    title: stack.name,
    description: stack.description,
  };
}

export default function StackPage({ params }: { params: { slug: string } }) {
  const stack = stacks.find(s => s.slug === params.slug);
  if (!stack) notFound();

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">
      <div className="mb-2 text-sm text-gray-500">
        <Link href="/stacks" className="hover:text-white transition-colors">Stacks</Link>
        {' / '}{stack.name}
      </div>

      <h1 className="text-4xl font-bold text-white mb-3">{stack.name}</h1>
      <p className="text-xl text-gray-400 mb-4">{stack.tagline}</p>
      <p className="text-gray-500 mb-12 leading-relaxed">{stack.description}</p>

      <div className="space-y-4">
        {stack.tools.map((stackTool, index) => {
          const tool = getToolById(stackTool.toolId);
          if (!tool) return null;
          return (
            <div key={stackTool.toolId} className="bg-gray-900 border border-gray-800 rounded-xl p-5">
              <div className="flex items-start gap-4">
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="text-gray-600 text-sm font-mono w-5">{index + 1}</span>
                  <div className="w-10 h-10 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-1" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-xs text-indigo-400 font-medium uppercase tracking-wide">{stackTool.role}</span>
                    <SoloScoreBadge score={tool.soloScore} size="sm" />
                  </div>
                  <h3 className="font-semibold text-white mb-1">{tool.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{stackTool.note}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <a
                      href={`/out/${tool.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-lg font-medium transition-colors"
                    >
                      Visit {tool.name} →
                    </a>
                    <Link href={`/tool/${tool.slug}`} className="text-sm text-gray-500 hover:text-white transition-colors">
                      Details
                    </Link>
                    <span className="text-gray-700 text-sm">{tool.pricing}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-indigo-900/20 border border-indigo-800 rounded-xl p-6 text-center">
        <p className="text-gray-400 mb-4">Get weekly stack updates and new tool reviews.</p>
        <Link href="/newsletter" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium transition-colors">
          Subscribe Free
        </Link>
      </div>
    </div>
  );
}
