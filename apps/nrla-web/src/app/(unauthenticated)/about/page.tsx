export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Header */}
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold text-white mb-4">
          About the NRLA
        </h1>
        <p className="text-xl text-gray-400">
          The National Residential Landlords Association
        </p>
      </section>

      {/* Who We Are */}
      <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Who We Are</h2>
        <p className="text-gray-300 leading-relaxed">
          The NRLA is the UK's largest membership organization for private residential landlords,
          representing over 100,000 members across England and Wales. We are the voice of the private
          rental sector, working tirelessly to support landlords and ensure their interests are heard
          at the highest levels of government and policy-making.
        </p>
      </section>

      {/* Our Relationship with Government */}
      <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Our Relationship with Government</h2>
        <p className="text-gray-300 leading-relaxed mb-4">
          The NRLA is an independent organization, not part of government. However, we maintain an
          active and influential presence in the policy-making process.
        </p>
        <p className="text-gray-300 leading-relaxed">
          We actively campaign and lobby for policy changes affecting landlords and work to influence
          legislation related to the private rental sector. Our expert team engages with MPs, government
          departments, and regulatory bodies to ensure that landlord perspectives are considered in all
          relevant policy discussions.
        </p>
      </section>

      {/* Our Goals */}
      <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-4">Our Goals</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-300">
              <strong className="text-white">Campaign for landlord interests:</strong> We push for
              legislative reform in the private rental sector that supports responsible landlords and
              promotes a healthy rental market.
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-300">
              <strong className="text-white">Represent landlord concerns:</strong> We ensure that
              landlords' voices are heard in policy discussions, bringing real-world experience to
              legislative debates.
            </p>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <p className="text-gray-300">
              <strong className="text-white">Support professional standards:</strong> We promote best
              practices and help landlords navigate the complex regulatory landscape with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-slate-800/50 border border-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-6">What We Offer Members</h2>
        <p className="text-gray-300 leading-relaxed mb-6">
          NRLA membership provides expertise, resources, exclusive member benefits, and significant
          savings. Our comprehensive support package includes:
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-400">Professional Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Access to insurance products
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Property management tools
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Mortgage products
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Deposit protection services
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-400">Expert Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Expert advice and guidance
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Compliance support
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Legal updates and alerts
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Best practice guidance
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Join Over 100,000 Landlords
        </h2>
        <p className="text-gray-400 mb-6">
          Become part of the UK's leading voice for private residential landlords
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Become a Member
        </a>
      </section>
    </div>
  );
}
