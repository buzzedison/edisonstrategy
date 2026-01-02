'use client';

import { useAuth } from '../../../lib/authContext';
import { useState, useEffect } from 'react';

export default function TestAuthPage() {
  const { user, session } = useAuth();
  const [authHistory, setAuthHistory] = useState<any[]>([]);

  useEffect(() => {
    const timestamp = new Date().toLocaleTimeString();
    setAuthHistory(prev => [...prev, {
      timestamp,
      hasSession: !!session,
      hasUser: !!user,
      userEmail: user?.email,
      sessionId: session?.access_token?.slice(-10) // Last 10 chars for identification
    }]);
  }, [session, user]);

  const adminEmail = 'buzzedison@gmail.com';
  const isAdmin = user?.email === adminEmail;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Auth Loading Test</h1>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Current State</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p><strong>Has Session:</strong> <span className={session ? 'text-green-600' : 'text-red-600'}>{session ? 'Yes' : 'No'}</span></p>
              <p><strong>Has User:</strong> <span className={user ? 'text-green-600' : 'text-red-600'}>{user ? 'Yes' : 'No'}</span></p>
              <p><strong>User Email:</strong> {user?.email || 'N/A'}</p>
            </div>
            <div>
              <p><strong>Admin Email:</strong> {adminEmail}</p>
              <p><strong>Is Admin:</strong> <span className={isAdmin ? 'text-green-600' : 'text-red-600'}>{isAdmin ? 'Yes' : 'No'}</span></p>
              <p><strong>Email Match:</strong> <span className={user?.email === adminEmail ? 'text-green-600' : 'text-red-600'}>{user?.email === adminEmail ? 'Yes' : 'No'}</span></p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Auth Loading History</h2>
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {authHistory.map((entry, index) => (
              <div key={index} className="text-sm border-l-4 border-blue-500 pl-4 py-2 bg-gray-50">
                <p><strong>{entry.timestamp}</strong></p>
                <p>Session: {entry.hasSession ? '✅' : '❌'} | User: {entry.hasUser ? '✅' : '❌'} | Email: {entry.userEmail || 'N/A'}</p>
                {entry.sessionId && <p className="text-xs text-gray-500">Session ID: ...{entry.sessionId}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => window.location.href = '/admin/insights/new'}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Test Admin Access
          </button>
        </div>
      </div>
    </div>
  );
} 