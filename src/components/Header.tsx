import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl tracking-tight">
          <span className="text-white">Solo</span>
          <span className="text-indigo-400">Stack</span>
          <span className="text-gray-500 text-sm font-normal ml-1">.dev</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/tools" className="text-gray-400 hover:text-white transition-colors">Browse Tools</Link>
          <Link href="/stacks" className="text-gray-400 hover:text-white transition-colors">Stacks</Link>
          <Link href="/newsletter" className="text-gray-400 hover:text-white transition-colors">Newsletter</Link>
          <Link href="/submit" className="text-gray-400 hover:text-white transition-colors">Submit</Link>
          <Link href="/newsletter" className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            Subscribe
          </Link>
        </nav>
        {/* Mobile menu placeholder */}
        <div className="md:hidden">
          <Link href="/tools" className="text-gray-400 hover:text-white text-sm">Browse →</Link>
        </div>
      </div>
    </header>
  );
}
