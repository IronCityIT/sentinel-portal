import { getSession } from '@auth0/nextjs-auth0';
import Link from 'next/link';

export default async function Home() {
  const session = await getSession();
  
  if (session?.user) {
    // User is logged in, redirect to dashboard
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Redirecting to dashboard...</p>
          <script dangerouslySetInnerHTML={{ __html: `window.location.href = '/dashboard'` }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-gray-700 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/icit-sentinel-logo.svg" alt="ICIT Sentinel" className="h-12" />
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
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
              Enterprise Security.
              <span className="block text-yellow-500">SMB Pricing.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 animate-fade-in-up animation-delay-200">
              Pittsburgh-based cybersecurity monitoring with 24/7 threat detection,
              6 intelligence sources, and dedicated CISO support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
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
              description: 'Real-time monitoring with 6 integrated threat intelligence sources including VirusTotal, AbuseIPDB, and GreyNoise.',
              icon: '🔍',
            },
            {
              title: 'HIPAA/SOC2 Compliant',
              description: 'Pre-configured compliance frameworks with automated reporting and audit trails.',
              icon: '✅',
            },
            {
              title: 'Dedicated CISO Support',
              description: 'Direct access to Bill Clendenning (CISSP, CISM, CISA, CRISC) with 20+ years experience.',
              icon: '👨‍💼',
            },
            {
              title: 'Multi-Tenant Architecture',
              description: 'Secure isolation with role-based access control. Each client sees only their data.',
              icon: '🏗️',
            },
            {
              title: 'Purple Team Testing',
              description: 'Collaborative security validation with real attack simulations and detection tuning.',
              icon: '🎯',
            },
            {
              title: 'Pittsburgh-Based',
              description: 'Local support, no offshore call centers. We understand Steel City businesses.',
              icon: '🌉',
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg rounded-xl p-8 border border-gray-700 hover:border-yellow-500 transition-all"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="text-4xl font-bold text-black mb-4">Simple, Transparent Pricing</h2>
          <div className="text-6xl font-bold text-black mb-2">$300-450</div>
          <div className="text-xl text-black opacity-90 mb-8">per month per client</div>
          <ul className="text-left text-black space-y-3 mb-8">
            {[
              '24/7 Security Monitoring',
              '6 Threat Intelligence Sources',
              'Compliance Reporting (HIPAA/SOC2)',
              'Dedicated CISO Access',
              'Monthly Executive Reports',
              'Purple Team Testing Available',
            ].map((item, i) => (
              <li key={i} className="flex items-center">
                <span className="mr-3 text-2xl">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a
            href="mailto:bill@ironcityit.com"
            className="bg-black hover:bg-gray-900 text-yellow-500 font-bold py-4 px-10 rounded-lg text-lg transition-all inline-block"
          >
            Get Started Today
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2025 Iron City IT Advisors LLC. All rights reserved.
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

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
