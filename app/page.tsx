import { getSession } from '@auth0/nextjs-auth0';

export default async function Home() {
  const session = await getSession();
  
  if (session?.user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Redirecting to dashboard...</p>
          <meta httpEquiv="refresh" content="0;url=/dashboard" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Large Logo */}
            <img 
              src="/icit-sentinel-logo.svg" 
              alt="ICIT Sentinel" 
              className="h-16 md:h-20 w-auto"
            />
          </div>
          <a
            href="/api/auth/login"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Client Login
          </a>
        </div>
      </header>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Enterprise Security.
            <span className="block text-yellow-500">SMB Pricing.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Enterprise-grade security operations for growing businesses. 24/7 threat detection, 
            multi-source intelligence, and hands-on executive security leadership—without the enterprise price tag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/api/auth/login"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-10 rounded-lg text-lg transition-all transform hover:scale-105 shadow-xl"
            >
              Access SIEM Dashboard →
            </a>
            <a
              href="mailto:bill@ironcityit.com"
              className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all border border-gray-700"
            >
              Request Demo
            </a>
          </div>
        </div>
      </div>

      {/* Live Stats Section */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Threats Blocked', value: '12,847', icon: '🛡️' },
            { label: 'Active Clients', value: '3', icon: '🏢' },
            { label: 'Uptime', value: '99.9%', icon: '⚡' },
            { label: 'Avg Response', value: '<5min', icon: '⏱️' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all transform hover:scale-105"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-yellow-500 mb-1">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Comprehensive Security Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: '24/7 Threat Detection',
              description: 'Real-time monitoring powered by 6 integrated intelligence feeds. We catch what automated tools miss.',
              icon: '🔍',
            },
            {
              title: 'HIPAA/SOC2 Compliant',
              description: 'HIPAA, SOC 2, PCI-DSS—pre-built frameworks with automated evidence collection. Audit-ready, always.',
              icon: '✅',
            },
            {
              title: 'Executive Security Leadership',
              description: 'Direct access to a battle-tested CISO with 20+ years leading security programs, incident response, and compliance initiatives. Not a help desk—a strategic partner who\'s been in the trenches.',
              icon: '👨‍💼',
            },
            {
              title: 'Multi-Tenant Architecture',
              description: 'Secure isolation with role-based access control. Each client sees only their data.',
              icon: '🏗️',
            },
            {
              title: 'Purple Team Testing',
              description: 'We don\'t just detect—we validate. Collaborative attack simulations that prove your defenses work.',
              icon: '🎯',
            },
            {
              title: 'Blue-Collar Security',
              description: 'We do the work. No outsourced SOC, no overseas call centers, no runaround. Proudly Pittsburgh-based, with the work ethic this city was built on. Straightforward protection from people who take pride in the craft.',
              icon: '🔧',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          Simple, Transparent Pricing
        </h2>
        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-yellow-500 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-yellow-500 mb-2">$500</div>
              <div className="text-gray-400">per month per client</div>
            </div>
            <ul className="space-y-4 mb-8">
              {[
                '24/7 Security Monitoring',
                '6 Threat Intelligence Sources',
                'Compliance Reporting (HIPAA/SOC2)',
                'Executive Security Leadership',
                'Monthly Executive Reports',
                'Purple Team Testing Available',
              ].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300">
                  <span className="text-yellow-500 mr-3">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              href="mailto:bill@ironcityit.com?subject=ICIT%20Sentinel%20Inquiry"
              className="block w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-lg text-center transition-all transform hover:scale-105"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-500 mb-4 md:mb-0">
              © 2026 Iron City IT Advisors LLC. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="mailto:bill@ironcityit.com" className="text-gray-400 hover:text-yellow-500">
                Contact
              </a>
              <a href="https://ironcityit.com" className="text-gray-400 hover:text-yellow-500">
                About Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
