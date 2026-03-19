'use client';
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { Tool, Category } from '@/types';
import ToolCard from './ToolCard';

interface Props {
  tools: Tool[];
  categories: Category[];
}

export default function ToolSearch({ tools, categories }: Props) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePricing, setActivePricing] = useState('all');
  const [sortBy, setSortBy] = useState<'score' | 'name' | 'newest'>('score');

  const fuse = useMemo(() => new Fuse(tools, {
    keys: ['name', 'tagline', 'description', 'tags'],
    threshold: 0.35,
    includeScore: true,
  }), [tools]);

  const results = useMemo(() => {
    let filtered: Tool[] = query
      ? fuse.search(query).map(r => r.item)
      : [...tools];

    if (activeCategory !== 'all') {
      filtered = filtered.filter(t => t.category === activeCategory);
    }
    if (activePricing !== 'all') {
      filtered = filtered.filter(t => t.pricingType === activePricing);
    }

    // Sort (only when not searching — search order is relevance)
    if (!query) {
      filtered.sort((a, b) => {
        if (sortBy === 'score') return b.soloScore - a.soloScore;
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'newest') return b.addedDate.localeCompare(a.addedDate);
        return 0;
      });
    }

    return filtered;
  }, [query, activeCategory, activePricing, sortBy, fuse, tools]);

  return (
    <div>
      {/* Search + filters row */}
      <div className="flex flex-col gap-3 mb-6">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search tools by name, tag, or description..."
          className="w-full bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          aria-label="Search tools"
        />
        <div className="flex gap-3 flex-wrap">
          <select
            value={activeCategory}
            onChange={e => setActiveCategory(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Categories</option>
            {categories.map(c => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <select
            value={activePricing}
            onChange={e => setActivePricing(e.target.value)}
            className="bg-gray-900 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Pricing</option>
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
            <option value="usage">Usage-based</option>
            <option value="open-source">Open Source</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as 'score' | 'name' | 'newest')}
            className="bg-gray-900 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-sm focus:outline-none focus:border-indigo-500"
          >
            <option value="score">Sort: Solo Score ↓</option>
            <option value="name">Sort: A–Z</option>
            <option value="newest">Sort: Newest</option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <div className="text-sm text-gray-500 mb-6">
        {results.length} tool{results.length !== 1 ? 's' : ''} found
        {activeCategory !== 'all' && ` in ${categories.find(c => c.slug === activeCategory)?.name}`}
      </div>

      {/* Results grid */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {results.map(tool => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-400 mb-2">No tools found for &quot;{query}&quot;</p>
          <p className="text-gray-600 text-sm">
            Know a tool that belongs here?{' '}
            <a href="/submit" className="text-indigo-400 hover:underline">Submit it →</a>
          </p>
        </div>
      )}
    </div>
  );
}
