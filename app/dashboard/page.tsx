'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { user, isLoading } = useUser();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400 font-mono text-sm">AUTHENTICATING...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#0a0e14] flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-6">Please log in to access the Command Center.</p>
          <a
            href="/api/auth/login"
            className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold tracking-wider"
          >
            LOGIN
          </a>
        </div>
      </div>
    );
  }

  const userInitials = user.name 
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user.email?.slice(0, 2).toUpperCase() || '??';

  return (
    <div className="min-h-screen bg-[#0a0e14] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141a24] border-r border-[#1e2836] flex flex-col fixed h-full">
        {/* Logo */}
        <div className="p-4 border-b border-[#1e2836]">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 48 48" className="w-9 h-9" fill="none">
              <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" stroke="#ff6b2c" strokeWidth="2" fill="none"/>
              <circle cx="24" cy="24" r="6" stroke="#ffc857" strokeWidth="2" fill="none"/>
              <circle cx="24" cy="24" r="2" fill="#ff6b2c"/>
            </svg>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wide">Iron City IT</span>
              <span className="text-[9px] text-orange-500 tracking-[2px] font-mono">COMMAND CENTER</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 overflow-y-auto">
          {/* Overview */}
          <div>
            <div className="text-[10px] text-gray-600 tracking-[2px] font-mono mb-2 px-3">OVERVIEW</div>
            <NavItem icon="dashboard" label="Dashboard" active />
            <NavItem icon="reports" label="Reports" />
          </div>

          {/* Products */}
          <div>
            <div className="text-[10px] text-gray-600 tracking-[2px] font-mono mb-2 px-3">PRODUCTS</div>
            <NavItem icon="attacksim" label="AttackSim Pro" href="https://asp.ironcityit.com" badge="Live" badgeColor="green" external />
            <NavItem icon="inspector" label="Threat Inspector" href="https://inspector.ironcityit.com" badge="Live" badgeColor="green" external />
            <NavItem icon="forensics" label="IronSight Forensics" />
            <NavItem icon="sentinel" label="ICIT Sentinel" href="https://sentinel.ironcityit.com" badge="Live" badgeColor="green" external />
            <NavItem icon="shadowscan" label="ShadowScan" />
          </div>

          {/* Account */}
          <div>
            <div className="text-[10px] text-gray-600 tracking-[2px] font-mono mb-2 px-3">ACCOUNT</div>
            <NavItem icon="settings" label="Settings" />
            <NavItem icon="security" label="Security" />
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-[#1e2836]">
          <div className="flex items-center gap-3 bg-[#1e2836] rounded p-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-black font-bold text-sm">
              {userInitials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name || 'Client'}</div>
              <div className="text-[10px] text-gray-500 font-mono tracking-wide">CLIENT</div>
            </div>
          </div>
          <a
            href="/api/auth/logout"
            className="flex items-center justify-center gap-2 w-full py-2 border border-[#1e2836] text-gray-400 hover:border-red-500 hover:text-red-500 transition-colors text-sm font-mono rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-[#0a0e14]/90 backdrop-blur-sm border-b border-[#1e2836] px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">Security Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-green-500">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono tracking-wide">All Systems Operational</span>
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1e2836] text-gray-400 hover:text-orange-500 transition-colors text-sm font-mono"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </header>

        <div className="p-6 space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-4">
            <StatCard label="Critical Findings" value="3" change="+2 from last week" changeType="up" color="red" />
            <StatCard label="Open Vulnerabilities" value="12" change="-5 resolved" changeType="down" color="yellow" />
            <StatCard label="Security Score" value="78" change="+8 points" changeType="down" color="green" />
            <StatCard label="Last Scan" value="2h" change="ago" changeType="neutral" color="cyan" />
          </div>

          {/* Products Grid */}
          <section>
            <h2 className="flex items-center gap-3 text-lg font-bold tracking-wide mb-4">
              <span className="w-1 h-5 bg-orange-500" />
              Your Security Products
            </h2>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
              <ProductTile
                name="AttackSim Pro"
                type="Purple Team Simulation"
                status="live"
                color="red"
                href="https://asp.ironcityit.com"
                stats={[
                  { value: '47', label: 'Tests Run' },
                  { value: '8', label: 'Findings' },
                ]}
              />
              <ProductTile
                name="Threat Inspector"
                type="AI-Powered Detection"
                status="live"
                color="cyan"
                href="https://inspector.ironcityit.com"
                stats={[
                  { value: '156', label: 'Scans' },
                  { value: '3', label: 'Active Threats' },
                ]}
              />
              <ProductTile
                name="ICIT Sentinel"
                type="SIEM & Log Management"
                status="live"
                color="yellow"
                href="https://sentinel.ironcityit.com"
                stats={[
                  { value: '24K', label: 'Events/Day' },
                  { value: '5', label: 'Alerts' },
                ]}
              />
              <ProductTile
                name="IronSight Forensics"
                type="Digital Forensics"
                status="coming"
                color="green"
                stats={[
                  { value: '—', label: 'Cases' },
                  { value: 'Q1', label: '2026' },
                ]}
              />
              <ProductTile
                name="ShadowScan"
                type="Dark Web Monitoring"
                status="beta"
                color="purple"
                stats={[
                  { value: '—', label: 'Alerts' },
                  { value: '—', label: 'Exposures' },
                ]}
              />
              <ProductTile
                name="IronClad Compliance"
                type="GRC Automation"
                status="coming"
                color="blue"
                stats={[
                  { value: '—', label: 'Controls' },
                  { value: 'Q2', label: '2026' },
                ]}
              />
            </div>
          </section>

          {/* Recent Activity */}
          <section>
            <h2 className="flex items-center gap-3 text-lg font-bold tracking-wide mb-4">
              <span className="w-1 h-5 bg-orange-500" />
              Recent Activity
            </h2>
            <div className="bg-[#141a24] border border-[#1e2836] p-4">
              <div className="space-y-0">
                <ActivityItem
                  type="critical"
                  title="Critical vulnerability detected: CVE-2024-1234"
                  product="AttackSim Pro"
                  time="2 hours ago"
                />
                <ActivityItem
                  type="success"
                  title="Weekly security scan completed successfully"
                  product="Threat Inspector"
                  time="5 hours ago"
                />
                <ActivityItem
                  type="warning"
                  title="Unusual login attempt detected from new location"
                  product="ICIT Sentinel"
                  time="Yesterday"
                />
                <ActivityItem
                  type="info"
                  title="New compliance report generated"
                  product="System"
                  time="2 days ago"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// Navigation Item Component
function NavItem({ 
  icon, 
  label, 
  active = false, 
  href, 
  badge, 
  badgeColor = 'gray',
  external = false 
}: { 
  icon: string; 
  label: string; 
  active?: boolean; 
  href?: string;
  badge?: string;
  badgeColor?: 'green' | 'yellow' | 'red' | 'gray';
  external?: boolean;
}) {
  const badgeColors = {
    green: 'bg-green-500/10 text-green-500',
    yellow: 'bg-yellow-500/10 text-yellow-500',
    red: 'bg-red-500/10 text-red-500',
    gray: 'bg-gray-500/10 text-gray-500',
  };

  const content = (
    <>
      <NavIcon name={icon} />
      <span className="flex-1 text-sm">{label}</span>
      {badge && (
        <span className={`text-[9px] px-1.5 py-0.5 font-mono ${badgeColors[badgeColor]}`}>
          {badge}
        </span>
      )}
    </>
  );

  const className = `flex items-center gap-3 px-3 py-2 rounded transition-colors ${
    active 
      ? 'bg-orange-500/10 text-orange-500' 
      : 'text-gray-400 hover:bg-[#1e2836] hover:text-white'
  }`;

  if (href) {
    return (
      <a href={href} target={external ? '_blank' : undefined} className={className}>
        {content}
      </a>
    );
  }

  return <div className={`${className} cursor-pointer`}>{content}</div>;
}

// Navigation Icons
function NavIcon({ name }: { name: string }) {
  const icons: Record<string, JSX.Element> = {
    dashboard: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1" strokeWidth="1.5" />
      </svg>
    ),
    reports: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    attacksim: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3" strokeWidth="1.5" />
      </svg>
    ),
    inspector: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="7" strokeWidth="1.5" />
        <path d="M21 21l-4-4" strokeLinecap="round" strokeWidth="1.5" />
      </svg>
    ),
    forensics: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="6" width="18" height="12" rx="1" strokeWidth="1.5" />
        <path d="M3 10h18" strokeWidth="1.5" />
      </svg>
    ),
    sentinel: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" strokeWidth="1.5" />
      </svg>
    ),
    shadowscan: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="8" strokeWidth="1.5" strokeDasharray="3 2" />
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
      </svg>
    ),
    settings: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" strokeWidth="1.5" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" strokeWidth="1.5" />
      </svg>
    ),
    security: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" strokeWidth="1.5" />
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      </svg>
    ),
  };
  return icons[name] || <div className="w-5 h-5" />;
}

// Stat Card Component
function StatCard({ 
  label, 
  value, 
  change, 
  changeType, 
  color 
}: { 
  label: string; 
  value: string; 
  change: string; 
  changeType: 'up' | 'down' | 'neutral';
  color: 'red' | 'yellow' | 'green' | 'cyan';
}) {
  const colors = {
    red: 'border-t-red-500 text-red-500',
    yellow: 'border-t-yellow-500 text-yellow-500',
    green: 'border-t-green-500 text-green-500',
    cyan: 'border-t-cyan-500 text-cyan-500',
  };

  const changeColors = {
    up: 'text-red-500',
    down: 'text-green-500',
    neutral: 'text-gray-500',
  };

  return (
    <div className={`bg-[#141a24] border border-[#1e2836] border-t-2 ${colors[color].split(' ')[0]} p-4`}>
      <div className="text-[10px] text-gray-500 tracking-[2px] font-mono uppercase mb-1">{label}</div>
      <div className={`text-3xl font-bold ${colors[color].split(' ')[1]}`}>{value}</div>
      <div className={`text-xs mt-1 ${changeColors[changeType]}`}>{change}</div>
    </div>
  );
}

// Product Tile Component
function ProductTile({
  name,
  type,
  status,
  color,
  href,
  stats,
}: {
  name: string;
  type: string;
  status: 'live' | 'beta' | 'coming';
  color: 'red' | 'cyan' | 'green' | 'yellow' | 'purple' | 'blue';
  href?: string;
  stats: { value: string; label: string }[];
}) {
  const colors = {
    red: 'border-red-500/30 hover:border-red-500',
    cyan: 'border-cyan-500/30 hover:border-cyan-500',
    green: 'border-green-500/30 hover:border-green-500',
    yellow: 'border-yellow-500/30 hover:border-yellow-500',
    purple: 'border-purple-500/30 hover:border-purple-500',
    blue: 'border-blue-500/30 hover:border-blue-500',
  };

  const textColors = {
    red: 'text-red-500',
    cyan: 'text-cyan-500',
    green: 'text-green-500',
    yellow: 'text-yellow-500',
    purple: 'text-purple-500',
    blue: 'text-blue-500',
  };

  const statusConfig = {
    live: { bg: 'bg-green-500/10', text: 'text-green-500', label: 'Live' },
    beta: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', label: 'Beta' },
    coming: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', label: 'Coming Soon' },
  };

  const badge = statusConfig[status];

  const Wrapper = href ? 'a' : 'div';
  const wrapperProps = href ? { href, target: '_blank' as const } : {};

  return (
    <Wrapper
      {...wrapperProps}
      className={`bg-[#141a24] border ${colors[color]} p-4 transition-all hover:-translate-y-1 ${href ? 'cursor-pointer' : ''} block group relative`}
    >
      {/* Left accent bar on hover */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${textColors[color].replace('text-', 'bg-')} opacity-0 group-hover:opacity-100 transition-opacity`} />
      
      <div className="flex justify-between items-start mb-3">
        <div className="w-10 h-10">
          <ProductIcon name={name} color={color} />
        </div>
        <span className={`${badge.bg} ${badge.text} text-[9px] px-2 py-0.5 font-mono`}>
          {badge.label}
        </span>
      </div>
      
      <h3 className="font-bold mb-0.5">{name}</h3>
      <div className={`text-[10px] ${textColors[color]} font-mono tracking-wider uppercase mb-3`}>{type}</div>
      
      <div className="flex gap-6 pt-3 border-t border-[#1e2836]">
        {stats.map((stat, i) => (
          <div key={i}>
            <div className="text-lg font-mono text-white">{stat.value}</div>
            <div className="text-[9px] text-gray-500 tracking-wider uppercase">{stat.label}</div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

// Product Icon
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
      <svg viewBox="0 0 40 40" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <circle cx="20" cy="20" r="15" />
        <circle cx="20" cy="20" r="5" />
        <path d="M20 5v5M20 30v5M5 20h5M30 20h5" />
      </svg>
    ),
    'Threat Inspector': (
      <svg viewBox="0 0 40 40" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <circle cx="16" cy="16" r="11" />
        <path d="M24 24l10 10" strokeLinecap="round" />
      </svg>
    ),
    'IronSight Forensics': (
      <svg viewBox="0 0 40 40" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <rect x="4" y="10" width="32" height="20" rx="2" />
        <path d="M4 16h32" />
        <circle cx="10" cy="13" r="1" fill={strokeColor} />
        <circle cx="15" cy="13" r="1" fill={strokeColor} />
      </svg>
    ),
    'ICIT Sentinel': (
      <svg viewBox="0 0 40 40" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <path d="M20 3L6 9v10c0 9 6 16 14 18 8-2 14-9 14-18V9L20 3z" />
        <path d="M20 12v8" />
        <circle cx="20" cy="25" r="2" fill={strokeColor} />
      </svg>
    ),
    'ShadowScan': (
      <svg viewBox="0 0 40 40" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <circle cx="20" cy="20" r="13" strokeDasharray="4 2" />
        <circle cx="20" cy="20" r="6" />
      </svg>
    ),
    'IronClad Compliance': (
      <svg viewBox="0 0 40 40" fill="none" stroke={strokeColor} strokeWidth="1.5">
        <rect x="6" y="3" width="28" height="34" rx="2" />
        <path d="M12 12h16M12 18h16M12 24h10" />
        <path d="M12 30l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return icons[name] || <div />;
}

// Activity Item Component
function ActivityItem({
  type,
  title,
  product,
  time,
}: {
  type: 'critical' | 'warning' | 'success' | 'info';
  title: string;
  product: string;
  time: string;
}) {
  const configs = {
    critical: { bg: 'bg-red-500/10', text: 'text-red-500', icon: '⚠' },
    warning: { bg: 'bg-yellow-500/10', text: 'text-yellow-500', icon: '!' },
    success: { bg: 'bg-green-500/10', text: 'text-green-500', icon: '✓' },
    info: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', icon: 'i' },
  };

  const config = configs[type];

  return (
    <div className="flex items-start gap-4 py-4 border-b border-[#1e2836] last:border-0">
      <div className={`w-9 h-9 rounded-full ${config.bg} ${config.text} flex items-center justify-center flex-shrink-0 font-bold`}>
        {config.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm text-white mb-1">{title}</div>
        <div className="flex gap-4 text-xs text-gray-500 font-mono">
          <span className="text-orange-500">{product}</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}
