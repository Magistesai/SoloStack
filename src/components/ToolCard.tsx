'use client';

import Link from 'next/link';
import { Tool } from '@/types';
import SoloScoreBadge from './SoloScoreBadge';

const pricingBadge: Record<string, string> = {
  free: 'bg-green-900/40 text-green-400',
  freemium: 'bg-blue-900/40 text-blue-400',
  paid: 'bg-purple-900/40 text-purple-400',
  usage: 'bg-orange-900/40 text-orange-400',
  'open-source': 'bg-teal-900/40 text-teal-400',
};

interface Props {
  tool: Tool;
  compact?: boolean;
}

export default function ToolCard({ tool, compact = false }: Props) {
  return (
    <div className={`bg-gray-900 border rounded-xl flex flex-col gap-3 hover:border-indigo-500 transition-all hover:shadow-lg hover:shadow-indigo-900/20 ${tool.sponsored ? 'border-indigo-500/40' : 'border-gray-800'} ${compact ? 'p-4' : 'p-5'}`}>
      {tool.sponsored && (
        <div className="text-xs text-indigo-400 font-medium tracking-wide">✦ Sponsored</div>
      )}
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0 border border-gray-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            width={40}
            height={40}
            className="w-full h-full object-contain p-1"
            onError={(e) => { (e.target as HTMLImageElement).src = '/logo-fallback.png'; }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-white text-sm">{tool.name}</h3>
            <SoloScoreBadge score={tool.soloScore} size="sm" />
          </div>
          <p className="text-gray-400 text-xs mt-0.5 truncate">{tool.pricing}</p>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${pricingBadge[tool.pricingType]}`}>
          {tool.pricingType}
        </span>
      </div>

      {!compact && (
        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{tool.tagline}</p>
      )}

      <div className="mt-auto flex gap-2">
        <a
          href={`/out/${tool.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg py-2 text-sm font-medium transition-colors"
        >
          Visit →
        </a>
        <Link
          href={`/tool/${tool.slug}`}
          className="border border-gray-700 hover:border-indigo-500 text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm transition-colors"
          title="View details"
        >
          Details
        </Link>
      </div>
    </div>
  );
}
