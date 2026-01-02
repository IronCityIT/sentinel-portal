import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Dashboard() {
  const session = await getSession();
  const user = session?.user;

  // Determine tenant based on email domain
  let tenant: 'ironcityit' | 'sagespine' | 'heatherwhite' = 'ironcityit';
  if (user?.email?.includes('@sagespine.com')) {
    tenant = 'sagespine';
  } else if (user?.email?.includes('@heatherwhite')) {
    tenant = 'heatherwhite';
  }

  const tenantNames: Record<'ironcityit' | 'sagespine' | 'heatherwhite', string> = {
    ironcityit: 'Iron City IT Advisors',
    sagespine: 'Sage Spine',
    heatherwhite: 'Heather White Accounting',
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Top Navigation */}
      <nav className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="text-yellow-500 text-xl font-bold">ICIT SENTINEL</div>
              <div>
                <div className="text-white font-bold">{tenantNames[tenant]}</div>
                <div className="text-gray-400 text-sm">{user?.email}</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="flex items-center text-green-400">
                <span className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Protected
              </span>
              <a
                href="/api/auth/logout"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-all"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Quick Stats */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Security Status', value: 'Protected', color: 'green' },
            { label: 'Threats Blocked (30d)', value: '127', color: 'yellow' },
            { label: 'Critical Alerts', value: '2', color: 'red' },
            { label: 'Uptime', value: '99.9%', color: 'blue' },
          ].map((stat, i) => (
            <div key={i} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">{stat.label}</div>
              <div className={`text-2xl font-bold text-${stat.color}-400`}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-6">
          <a
            href={`${process.env.NEXT_PUBLIC_WAZUH_URL}/app/wazuh#/overview?tab=general&tabView=panels`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-6 py-3 rounded-lg transition-all"
          >
            📊 View Full SIEM
          </a>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all">
            📄 Download Report
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all">
            🎯 Schedule Purple Team Test
          </button>
          <a
            href="mailto:bill@ironcityit.com"
            className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all"
          >
            💬 Contact Support
          </a>
        </div>

        {/* Wazuh Dashboard Embed */}
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="bg-gray-900 px-6 py-4 border-b border-gray-700">
            <h2 className="text-white font-bold text-lg">Security Intelligence Dashboard</h2>
            <p className="text-gray-400 text-sm">Real-time threat monitoring and alerts</p>
          </div>
          <div className="relative" style={{ height: '800px' }}>
            <iframe
              src={`${process.env.NEXT_PUBLIC_WAZUH_URL}/app/wazuh`}
              className="w-full h-full"
              title="Wazuh SIEM Dashboard"
            />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-gray-800 rounded-lg border border-gray-700 p-6">
          <h3 className="text-white font-bold text-lg mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { time: '2 min ago', event: 'Failed login attempt blocked', severity: 'high' },
              { time: '15 min ago', event: 'Vulnerability scan completed', severity: 'info' },
              { time: '1 hour ago', event: 'Malicious IP detected and blocked', severity: 'critical' },
              { time: '3 hours ago', event: 'System health check passed', severity: 'low' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
                <div className="flex items-center space-x-3">
                  <span className={`h-2 w-2 rounded-full ${
                    activity.severity === 'critical' ? 'bg-red-500' :
                    activity.severity === 'high' ? 'bg-orange-500' :
                    activity.severity === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></span>
                  <span className="text-white">{activity.event}</span>
                </div>
                <span className="text-gray-400 text-sm">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}, { returnTo: '/' });
