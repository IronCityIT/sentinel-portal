'use client';

import { useUser } from '@auth0/nextjs-auth0/client';

export default function Dashboard() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Please log in to access the dashboard.</p>
          
            href="/api/auth/login"
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-8 rounded-lg"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  const wazuhUrl = process.env.NEXT_PUBLIC_WAZUH_URL || 'https://sentinel.ironcityit.com';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-yellow-500 text-xl font-bold">ICIT SENTINEL</span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-400">Security Dashboard</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-400">{user.email}</span>
            
              href="/api/auth/logout"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              Logout
            </a>
          </div>
        </div>
      </header>

      <div className="px-6 py-4 border-b border-gray-800">
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-500">247</div>
            <div className="text-gray-400 text-sm">Events Today</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-500">3</div>
            <div className="text-gray-400 text-sm">Critical Alerts</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-500">99.9%</div>
            <div className="text-gray-400 text-sm">Uptime</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-500">12</div>
            <div className="text-gray-400 text-sm">Agents Active</div>
          </div>
        </div>
      </div>

      <div className="flex-1" style={{ height: 'calc(100vh - 180px)' }}>
        <iframe
          src={wazuhUrl}
          className="w-full h-full border-0"
          title="ICIT Sentinel SIEM"
        />
      </div>
    </div>
  );
}
