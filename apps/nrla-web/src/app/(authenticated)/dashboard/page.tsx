import { withAuth } from '@workos-inc/authkit-nextjs';

export default async function DashboardPage() {
  const { user } = await withAuth();

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <section className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/30 rounded-lg p-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back {user?.firstName || 'Member'}!
        </h1>
      </section>

      {/* Portfolio Service Stats Banner */}
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Portfolio Overview</h2>
            <p className="text-sm text-gray-400">Your property management statistics</p>
          </div>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View Full Portfolio →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Properties */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <h3 className="text-xs font-medium text-gray-400 uppercase">Properties</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">12</p>
            <p className="text-xs text-green-400">+2 this month</p>
          </div>

          {/* Active Tenancies */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-xs font-medium text-gray-400 uppercase">Active Tenancies</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">10</p>
            <p className="text-xs text-gray-400">83% occupancy</p>
          </div>

          {/* Monthly Rent */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xs font-medium text-gray-400 uppercase">Monthly Rent</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">£8,450</p>
            <p className="text-xs text-green-400">95% collected</p>
          </div>

          {/* Maintenance Requests */}
          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-xs font-medium text-gray-400 uppercase">Maintenance</h3>
            </div>
            <p className="text-3xl font-bold text-white mb-1">3</p>
            <p className="text-xs text-orange-400">Pending requests</p>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-700">
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Avg. Property Value</p>
            <p className="text-lg font-semibold text-white">£285,000</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Total Portfolio Value</p>
            <p className="text-lg font-semibold text-white">£3.42M</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-400 mb-1">Avg. Tenancy Length</p>
            <p className="text-lg font-semibold text-white">18 months</p>
          </div>
        </div>
      </section>

      {/* Training Courses Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Recommended Training</h2>
            <p className="text-sm text-gray-400">Courses tailored to your experience level</p>
          </div>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Browse All Courses →
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Course 1 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-colors group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Landlord Legal Compliance 2024</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Stay up-to-date with the latest legal requirements, safety regulations, and compliance obligations.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2.5 hours
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Intermediate
                  </span>
                  <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded">New</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course 2 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-colors group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Rent Collection & Financial Management</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Master rent collection strategies, handle arrears, and optimize your property finances.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    1.5 hours
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Beginner
                  </span>
                  <span className="text-yellow-400">★ 4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course 3 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-colors group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Property Maintenance Essentials</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Learn to manage maintenance requests, find reliable contractors, and prevent costly repairs.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    3 hours
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Intermediate
                  </span>
                  <span className="text-yellow-400">★ 4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course 4 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-colors group cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-500/20 transition-colors">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold mb-1">Tenant Relations & Conflict Resolution</h3>
                <p className="text-sm text-gray-400 mb-3">
                  Build positive tenant relationships and handle disputes professionally and effectively.
                </p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    2 hours
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    All Levels
                  </span>
                  <span className="text-yellow-400">★ 4.7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Member Discounts Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Member Discounts</h2>
            <p className="text-sm text-gray-400">Exclusive savings at our partner retailers</p>
          </div>
          <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            View All Partners →
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* B&Q */}
          <a 
            href="https://www.diy.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-orange-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-orange-400">B&Q</span>
              </div>
              <span className="px-2 py-1 bg-orange-500/10 text-orange-400 text-xs font-semibold rounded">15% OFF</span>
            </div>
            <h3 className="text-white font-semibold mb-1">B&Q</h3>
            <p className="text-sm text-gray-400 mb-3">
              Save on tools, building materials, paint, and home improvement supplies.
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Most popular
            </div>
          </a>

          {/* Screwfix */}
          <a 
            href="https://www.screwfix.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-blue-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 008 10.586V5L7 4z" />
                </svg>
              </div>
              <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-xs font-semibold rounded">10% OFF</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Screwfix</h3>
            <p className="text-sm text-gray-400 mb-3">
              Trade tools, plumbing, electrical supplies, and hardware essentials.
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Click & collect available
            </div>
          </a>

          {/* Toolstation */}
          <a 
            href="https://www.toolstation.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-purple-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <span className="px-2 py-1 bg-purple-500/10 text-purple-400 text-xs font-semibold rounded">12% OFF</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Toolstation</h3>
            <p className="text-sm text-gray-400 mb-3">
              Professional tools, building supplies, and trade equipment.
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Trade account benefits
            </div>
          </a>

          {/* Wickes */}
          <a 
            href="https://www.wickes.co.uk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-green-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <span className="px-2 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded">10% OFF</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Wickes</h3>
            <p className="text-sm text-gray-400 mb-3">
              Kitchens, bathrooms, building materials, and home improvement products.
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Free design service
            </div>
          </a>

          {/* Homebase */}
          <a 
            href="https://www.homebase.co.uk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-yellow-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-semibold rounded">8% OFF</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Homebase</h3>
            <p className="text-sm text-gray-400 mb-3">
              Garden supplies, decorating materials, and home essentials.
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
              </svg>
              Seasonal offers
            </div>
          </a>

          {/* Travis Perkins */}
          <a 
            href="https://www.travisperkins.co.uk" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 hover:border-red-500/50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="px-2 py-1 bg-red-500/10 text-red-400 text-xs font-semibold rounded">15% OFF</span>
            </div>
            <h3 className="text-white font-semibold mb-1">Travis Perkins</h3>
            <p className="text-sm text-gray-400 mb-3">
              Builders merchants with timber, bricks, cement, and construction materials.
            </p>
            <div className="flex items-center text-xs text-gray-500">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              Bulk order discounts
            </div>
          </a>
        </div>
      </section>

    </div>
  );
}
