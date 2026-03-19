import { Metadata } from 'next';
import Link from 'next/link';
import { stacks, getToolById } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Stacks',
  description: 'Pre-built tool stacks for solo founders. The $0 Launch Stack, 1-Day MVP Stack, and Automation-First Stack.',
};

export default function StacksPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-white mb-3">Solo Founder Stacks</h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Pre-built tool combinations for specific goals. Not just lists — each tool has a role and a reason.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stacks.map(stack => {
          const previewTools = stack.tools.slice(0, 4).map(st => getToolById(st.toolId)).filter(Boolean);
          return (
            <Link
              key={stack.id}
              href={`/stack/${stack.slug}`}
              className="bg-gray-900 border border-gray-800 hover:border-indigo-500 rounded-2xl p-6 flex flex-col gap-4 transition-all hover:shadow-lg hover:shadow-indigo-900/20 group"
            >
              <div>
                <h2 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors mb-1">
                  {stack.name}
                </h2>
                <p className="text-gray-400 text-sm">{stack.tagline}</p>
              </div>
              <div className="flex gap-2 flex-wrap">
                {previewTools.map(tool => tool && (
                  <div key={tool.id} className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>
                ))}
                {stack.tools.length > 4 && (
                  <div className="w-8 h-8 rounded-lg bg-gray-800 border border-gray-700 flex items-center justify-center text-xs text-gray-400">
                    +{stack.tools.length - 4}
                  </div>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {stack.tools.length} tools in this stack
              </div>
              <div className="text-indigo-400 text-sm font-medium group-hover:text-indigo-300">
                View stack →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
