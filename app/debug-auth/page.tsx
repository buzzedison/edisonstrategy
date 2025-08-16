'use client';

import { useAuth } from '../../lib/authContext';

export default function DebugAuthPage() {
  const { user, session } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Session Status</h2>
          <p><strong>Has Session:</strong> {session ? 'Yes' : 'No'}</p>
          <p><strong>Has User:</strong> {user ? 'Yes' : 'No'}</p>
        </div>

        {user && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Created At:</strong> {user.created_at}</p>
            <p><strong>Email Confirmed:</strong> {user.email_confirmed_at ? 'Yes' : 'No'}</p>
          </div>
        )}

        {user?.user_metadata && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">User Metadata</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
              {JSON.stringify(user.user_metadata, null, 2)}
            </pre>
          </div>
        )}

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Admin Check</h2>
          <p><strong>Admin Email:</strong> buzzedison@gmail.com</p>
          <p><strong>Your Email:</strong> {user?.email || 'Not logged in'}</p>
          <p><strong>Is Admin:</strong> {user?.email === 'buzzedison@gmail.com' ? 'Yes' : 'No'}</p>
        </div>

        {session && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Full Session Data</h2>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 