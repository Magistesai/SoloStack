import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20 py-12 text-sm text-gray-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
        <div className="max-w-xs">
          <div className="font-bold text-white text-lg mb-2">
            <span>Solo</span><span className="text-indigo-400">Stack</span><span className="text-gray-500 text-sm font-normal">.dev</span>
          </div>
          <p className="leading-relaxed">Opinionated tools for founders who build alone. No enterprise bloat. No gameable ratings.</p>
          <p className="mt-2 text-xs">Some links are affiliate links. We earn a commission at no cost to you.</p>
        </div>
        <div className="flex gap-12">
          <div>
            <div className="text-white font-medium mb-3">Directory</div>
            <div className="flex flex-col gap-2">
              <Link href="/tools" className="hover:text-white transition-colors">All Tools</Link>
              <Link href="/stacks" className="hover:text-white transition-colors">Stacks</Link>
              <Link href="/submit" className="hover:text-white transition-colors">Submit Tool</Link>
            </div>
          </div>
          <div>
            <div className="text-white font-medium mb-3">Company</div>
            <div className="flex flex-col gap-2">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
