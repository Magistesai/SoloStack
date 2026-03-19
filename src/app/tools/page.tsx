import { Metadata } from 'next';
import { tools, categories } from '@/lib/data';
import ToolSearch from '@/components/ToolSearch';

export const metadata: Metadata = {
  title: 'All Tools',
  description: `Browse ${tools.length}+ curated tools for solo founders. Filter by category, pricing, and Solo Score.`,
};

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-3">All Tools</h1>
        <p className="text-gray-400 text-lg">
          {tools.length} tools curated for solo founders. Every tool rated 0–100 for solo-founder fit — not general popularity.
        </p>
      </div>
      <ToolSearch tools={tools} categories={categories} />
    </div>
  );
}
