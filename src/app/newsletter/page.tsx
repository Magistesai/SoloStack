// src/app/newsletter/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter — Solo Stack Weekly',
  description: 'The Solo Stack Weekly: one founder\'s full tool stack, three new tool reviews, one automation tip. Free, every week.',
};

export default function NewsletterPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">The Solo Stack Weekly</h1>
        <p className="text-gray-400 text-lg">Every week, one email. Free forever.</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-8">
        <h2 className="text-xl font-bold text-white mb-6">What you get each week</h2>
        <div className="space-y-4">
          {[
            { icon: '🔧', title: 'One founder\'s full stack', desc: 'Exactly what tools they use and why — payments, analytics, email, hosting, everything.' },
            { icon: '⭐', title: 'Three new tool reviews', desc: 'Fresh tools rated by Solo Score. Honest opinion on whether they\'re actually worth it.' },
            { icon: '⚡', title: 'One automation tip', desc: 'A specific workflow, script, or setup that saves real hours. No fluff.' },
          ].map(item => (
            <div key={item.title} className="flex gap-4">
              <span className="text-2xl flex-shrink-0">{item.icon}</span>
              <div>
                <div className="font-medium text-white">{item.title}</div>
                <div className="text-gray-400 text-sm mt-0.5">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-indigo-900/20 border border-indigo-800 rounded-2xl p-8 text-center">
        <p className="text-white font-semibold text-lg mb-2">Join solo founders who subscribe</p>
        <p className="text-gray-400 text-sm mb-6">No spam. Unsubscribe any time.</p>

        {/* Email signup form — functional via mailto or replace with Beehiiv embed */}
        <form
          action="mailto:hello@solostack.dev"
          method="get"
          encType="text/plain"
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="subscribe"
            placeholder="your@email.com"
            required
            className="flex-1 bg-gray-900 border border-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 text-sm"
          />
          <button
            type="submit"
            className="whitespace-nowrap bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            Subscribe Free
          </button>
        </form>
        <p className="text-gray-600 text-xs mt-4">Replace with Beehiiv embed once account is set up.</p>
      </div>
    </div>
  );
}
