import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold text-white mb-4">
          Simplify Your Landlord Journey
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Everything you need to manage properties, learn best practices, and
          save money—all in one membership.
        </p>
        <Link
          href="/login"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Get Started Today
        </Link>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Property Management Platform
          </h3>
          <p className="text-gray-400">
            Manage tenants, track rent payments, schedule maintenance, and keep
            all your property documents organized in one place.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Expert Training & Resources
          </h3>
          <p className="text-gray-400">
            Access comprehensive training modules, legal guides, and best
            practices from experienced landlords and property experts.
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
          <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            Exclusive Discounts
          </h3>
          <p className="text-gray-400">
            Save money with member-only discounts at major hardware stores,
            maintenance services, and property management tools.
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            Membership Package
          </h2>
          <p className="text-gray-400">
            One simple plan with everything you need
          </p>
        </div>

        <div className="bg-linear-to-br from-slate-800 to-slate-900 border-2 border-blue-500/50 rounded-xl p-8 shadow-xl">
          <div className="text-center mb-6">
            <div className="text-5xl font-bold text-white mb-2">
              £29<span className="text-2xl text-gray-400">/month</span>
            </div>
            <p className="text-gray-400">or £290/year (save 2 months)</p>
          </div>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-400 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">
                Full access to property management platform
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-400 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">
                Unlimited properties and tenants
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-400 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">
                Complete landlord training library
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-400 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">
                Legal document templates and guides
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-400 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">
                Exclusive discounts at B&Q, Screwfix, and more
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-green-400 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-gray-300">Priority email support</span>
            </li>
          </ul>

          <Link
            href="/login"
            className="block w-full bg-blue-500 hover:bg-blue-600 text-white text-center font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Start Your Membership
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-12 bg-slate-800/30 rounded-xl border border-slate-700">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to streamline your property management?
        </h2>
        <p className="text-gray-400 mb-6">
          Join hundreds of landlords who trust NRLA for their property needs.
        </p>
        <Link
          href="/login"
          className="inline-block bg-white hover:bg-gray-100 text-slate-900 font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Get Started Free
        </Link>
      </section>
    </div>
  );
}
