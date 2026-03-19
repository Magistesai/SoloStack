'use client';

import Link from 'next/link';
import { useState } from 'react';

const navLinks = [
  { href: '/tools', label: 'Browse Tools' },
  { href: '/stacks', label: 'Stacks' },
  { href: '/newsletter', label: 'Newsletter' },
  { href: '/submit', label: 'Submit' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight" onClick={() => setOpen(false)}>
          <span className="text-white">Solo</span>
          <span className="text-indigo-400">Stack</span>
          <span className="text-gray-500 text-sm font-normal ml-1">.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {navLinks.map(l => (
            <Link key={l.href} href={l.href} className="text-gray-400 hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
          <Link href="/newsletter" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Subscribe
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 group"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-gray-400 transition-all ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-gray-800 bg-gray-950 px-4 py-4 flex flex-col gap-3">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-white py-2 text-base border-b border-gray-800/50 last:border-0"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/newsletter"
            className="mt-2 text-center bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-3 rounded-xl font-semibold transition-colors"
            onClick={() => setOpen(false)}
          >
            Subscribe Free →
          </Link>
        </div>
      )}
    </header>
  );
}
