'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e14] text-white overflow-hidden">
      {/* Animated grid background */}
      <div 
        className="fixed inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 107, 44, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 107, 44, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Glow effects */}
      <div className="fixed top-[-200px] right-[-200px] w-[600px] h-[600px] rounded-full bg-orange-500 opacity-10 blur-[150px] pointer-events-none" />
      <div className="fixed bottom-[-300px] left-[-200px] w-[600px] h-[600px] rounded-full bg-cyan-500 opacity-10 blur-[150px] pointer-events-none" />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0a0e14] to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <svg viewBox="0 0 48 48" className="w-10 h-10" fill="none">
              <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="#ff6b2c" strokeWidth="2" fill="none"/>
              <path d="M24 4v40M4 14l20 10 20-10M4 34l20-10 20 10" stroke="#ff6b2c" strokeWidth="1.5" opacity="0.5"/>
              <circle cx="24" cy="24" r="6" stroke="#ffc857" strokeWidth="2" fill="none"/>
              <circle cx="24" cy="24" r="2" fill="#ff6b2c"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wider">IRON CITY IT</span>
              <span className="text-[10px] text-orange-500 tracking-[3px] font-mono">COMMAND CENTER</span>
            </div>
          </div>
          
          <nav className="flex items-center gap-8">
            <a href="#products" className="text-sm text-gray-400 hover:text-orange-500 transition-colors font-mono tracking-wide">Products</a>
            <a href="#solutions" className="text-sm text-gray-400 hover:text-orange-500 transition-colors font-mono tracking-wide">Solutions</a>
            <a href="https://ironcityit.com" target="_blank" className="text-sm text-gray-400 hover:text-orange-500 transition-colors font-mono tracking-wide">About Us</a>
            <a
              href="/api/auth/login"
              className="relative px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-semibold tracking-wider text-sm overflow-hidden group"
              style={{ clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))' }}
            >
              <span className="relative z-10">CLIENT LOGIN</span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 pt-32">
        <section className="max-w-6xl mx-auto px-6 text-center py-16">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-[#1e2836] border border-orange-500 px-4 py-2 mb-8 animate-pulse">
            <span className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-xs text-orange-500 tracking-[2px] font-mono uppercase">Systems Operational</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wider">
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">BLUE-COLLAR</span>
            <br />
            <span className="text-white">SECURITY</span>
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Enterprise-grade cybersecurity without the enterprise price tag. 
            Real protection, real expertise, proudly Pittsburgh-based.
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-16 mt-12">
            <div className="text-center">
              <div className="text-4xl font-mono text-cyan-400">6</div>
              <div className="text-xs text-gray-500 tracking-[2px] uppercase mt-1">Security Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono text-cyan-400">24/7</div>
              <div className="text-xs text-gray-500 tracking-[2px] uppercase mt-1">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-mono text-cyan-400">100%</div>
              <div className="text-xs text-gray-500 tracking-[2px] uppercase mt-1">In-House Expertise</div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="products" className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-wider mb-4">SECURITY PRODUCT SUITE</h2>
            <p className="text-gray-400">Comprehensive protection powered by AI Consensus Engine™</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AttackSim Pro */}
            <ProductCard
              name="AttackSim Pro"
              type="Purple Team • Breach Simulation"
              description="Continuous breach and attack simulation tailored to your business. Find vulnerabilities before attackers do."
              status="live"
              color="red"
              features={['Business-specific attack scenarios', 'AI-powered threat analysis', 'Compliance framework mapping', 'Executive reporting']}
              link="https://asp.ironcityit.com"
              linkText="Launch Dashboard"
            />

            {/* Threat Inspector */}
            <ProductCard
              name="Threat Inspector"
              type="Blue Team • Threat Detection"
              description="Advanced defensive scanning with multi-model AI consensus. Identify threats traditional tools miss."
              status="live"
              color="cyan"
              features={['5-Model AI Consensus Engine™', 'Real-time threat intelligence', 'YARA malware scanning', 'Automated remediation guidance']}
              link="https://inspector.ironcityit.com"
              linkText="Launch Dashboard"
            />

            {/* IronSight Forensics */}
            <ProductCard
              name="IronSight Forensics"
              type="Forensics • Incident Response"
              description="AI-powered digital forensics. Memory analysis, disk forensics, and timeline reconstruction with machine learning."
              status="coming"
              color="green"
              features={['Memory dump analysis', 'Disk image forensics', 'Timeline reconstruction', 'AI-assisted investigation']}
              link="#"
              linkText="Coming Q1 2026"
            />

            {/* ICIT Sentinel */}
            <ProductCard
              name="ICIT Sentinel"
              type="SIEM • Log Management"
              description="Multi-tenant SIEM platform powered by Wazuh. Centralized security monitoring for all your clients."
              status="live"
              color="yellow"
              features={['Real-time log analysis', 'Custom detection rules', 'Compliance reporting', 'Multi-tenant architecture']}
              link="https://sentinel.ironcityit.com"
              linkText="Launch Dashboard"
            />

            {/* ShadowScan */}
            <ProductCard
              name="ShadowScan"
              type="Dark Web • Threat Intel"
              description="Deep and dark web monitoring. Discover exposed credentials and threats before they impact your business."
              status="beta"
              color="purple"
              features={['Credential leak detection', 'Brand monitoring', 'Threat actor tracking', 'Automated alerts']}
              link="#"
              linkText="Request Access"
            />

            {/* IronClad Compliance */}
            <ProductCard
              name="IronClad Compliance"
              type="GRC • Compliance-as-Code"
              description="Automated compliance management. Continuous alignment with NIST, SOC2, HIPAA, and more."
              status="coming"
              color="blue"
              features={['Real-time compliance monitoring', 'Policy-as-code enforcement', 'Audit-ready reporting', 'Gap analysis']}
              link="#"
              linkText="Coming Q2 2026"
            />
          </div>
        </section>

        {/* CTA Section */}
        <section id="solutions" className="max-w-4xl mx-auto px-6 py-24">
          <div className="relative">
            {/* Decorative line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 -mt-24 bg-gradient-to-b from-transparent via-orange-500 to-transparent" />
            
            <div 
              className="bg-[#141a24] border border-[#1e2836] p-12 text-center"
              style={{ clipPath: 'polygon(20px 0, calc(100% - 20px) 0, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0 calc(100% - 20px), 0 20px)' }}
            >
              <h2 className="text-3xl font-bold tracking-wider mb-4">Ready to Secure Your Business?</h2>
              <p className="text-gray-400 text-lg mb-8">Get started with a free security assessment. No sales pitch, just honest insights.</p>
              
              <div className="flex justify-center gap-4 flex-wrap">
                <a
                  href="/api/auth/login"
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold tracking-wider hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                >
                  CLIENT PORTAL LOGIN
                </a>
                <a
                  href="mailto:security@ironcityit.com"
                  className="px-8 py-3 border border-gray-600 text-white font-bold tracking-wider hover:border-orange-500 hover:text-orange-500 transition-all"
                  style={{ clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                >
                  CONTACT SALES
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-[#1e2836] py-12">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <div className="text-xl font-bold tracking-wider mb-2">IRON CITY IT ADVISORS</div>
            <div className="text-xs text-orange-500 tracking-[3px] font-mono mb-8">"While You Relaxed, We Reinvented Business Solutions"</div>
            
            <div className="flex justify-center gap-8 mb-8 flex-wrap">
              <a href="https://ironcityit.com" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Home</a>
              <a href="#products" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Products</a>
              <a href="mailto:security@ironcityit.com" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Contact</a>
              <a href="#" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Terms of Service</a>
            </div>
            
            <div className="text-sm text-gray-600">
              © 2026 Iron City IT Advisors. All rights reserved. Pittsburgh, PA.
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

// Product Card Component
interface ProductCardProps {
  name: string;
  type: string;
  description: string;
  status: 'live' | 'beta' | 'coming';
  color: 'red' | 'cyan' | 'green' | 'yellow' | 'purple' | 'blue';
  features: string[];
  link: string;
  linkText: string;
}

function ProductCard({ name, type, description, status, color, features, link, linkText }: ProductCardProps) {
  const colorClasses = {
    red: 'border-red-500/50 hover:border-red-500',
    cyan: 'border-cyan-500/50 hover:border-cyan-500',
    green: 'border-green-500/50 hover:border-green-500',
    yellow: 'border-yellow-500/50 hover:border-yellow-500',
    purple: 'border-purple-500/50 hover:border-purple-500',
    blue: 'border-blue-500/50 hover:border-blue-500',
  };

  const textColors = {
    red: 'text-red-500',
    cyan: 'text-cyan-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500',
    blue: 'text-blue-500',
  };

  const statusBadges = {
    live: { bg: 'bg-green-500/10', border: 'border-green-500', text: 'text-green-500', label: 'Live' },
    beta: { bg: 'bg-yellow-500/10', border: 'border-yellow-500', text: 'text-yellow-500', label: 'Beta' },
    coming: { bg: 'bg-cyan-500/10', border: 'border-cyan-500', text: 'text-cyan-500', label: 'Coming Soon' },
  };

  const badge = statusBadges[status];

  return (
    <div 
      className={`bg-gradient-to-b from-[#141a24] to-[#0a0e14] border ${colorClasses[color]} p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group`}
      style={{ clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))' }}
    >
      {/* Top accent line on hover */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${textColors[color].replace('text-', 'bg-')} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      {/* Status badge */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12">
          <ProductIcon name={name} color={color} />
        </div>
        <span className={`${badge.bg} ${badge.text} border ${badge.border} text-[10px] px-2 py-0.5 font-mono tracking-wide`}>
          {badge.label}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <div className={`text-xs ${textColors[color]} font-mono tracking-wider mb-3 uppercase`}>{type}</div>
      <p className="text-gray-400 text-sm leading-relaxed mb-4">{description}</p>
      
      <ul className="space-y-2 mb-6">
        {features.map((feature, i) => (
          <li key={i} className="text-xs text-gray-500 flex items-center gap-2">
            <span className={textColors[color]}>▹</span>
            {feature}
          </li>
        ))}
      </ul>

      <a 
        href={link} 
        target={link.startsWith('http') ? '_blank' : undefined}
        className={`inline-flex items-center gap-2 ${textColors[color]} text-sm font-mono hover:gap-3 transition-all`}
      >
        {linkText}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  );
}

// Simple product icons
function ProductIcon({ name, color }: { name: string; color: string }) {
  const strokeColor = {
    red: '#ef4444',
    cyan: '#06b6d4',
    green: '#22c55e',
    yellow: '#eab308',
    purple: '#a855f7',
    blue: '#3b82f6',
  }[color];

  const icons: Record<string, JSX.Element> = {
    'AttackSim Pro': (
      <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="6" />
        <path d="M24 6v6M24 36v6M6 24h6M36 24h6" />
      </svg>
    ),
    'Threat Inspector': (
      <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <circle cx="20" cy="20" r="14" />
        <path d="M30 30l12 12" strokeLinecap="round" />
      </svg>
    ),
    'IronSight Forensics': (
      <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <rect x="6" y="12" width="36" height="24" rx="2" />
        <path d="M6 20h36" />
        <circle cx="14" cy="16" r="1.5" fill={strokeColor} />
        <circle cx="20" cy="16" r="1.5" fill={strokeColor} />
      </svg>
    ),
    'ICIT Sentinel': (
      <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <path d="M24 4L40 12v14c0 10-16 16-16 16S8 36 8 26V12L24 4z" />
        <path d="M24 14v12" />
        <circle cx="24" cy="32" r="2" fill={strokeColor} />
      </svg>
    ),
    'ShadowScan': (
      <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <circle cx="24" cy="24" r="16" strokeDasharray="4 2" />
        <circle cx="24" cy="24" r="8" />
      </svg>
    ),
    'IronClad Compliance': (
      <svg viewBox="0 0 48 48" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <rect x="8" y="4" width="32" height="40" rx="2" />
        <path d="M16 16h16M16 24h16M16 32h10" />
        <path d="M16 38l4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[name] || <div />;
}
