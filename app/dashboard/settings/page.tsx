'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Image from 'next/image';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Camera, 
  Save,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { cn } from '@/lib/utils';

interface UserSettings {
  profile: {
    name: string;
    email: string;
    bio: string;
    avatar: string;
    website: string;
    location: string;
  };
  notifications: {
    emailNotifications: boolean;
    newComments: boolean;
    articleUpdates: boolean;
    newsletter: boolean;
    marketingEmails: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private';
    showReadingHistory: boolean;
    showLikedArticles: boolean;
    allowComments: boolean;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    language: string;
    timezone: string;
    articlesPerPage: number;
  };
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    profile: {
      name: 'Edison Ade',
      email: 'edison@buzzedison.com',
      bio: 'Entrepreneur, tech consultant, and business strategist helping founders turn ideas into profitable ventures.',
      avatar: '/image/edison.png',
      website: 'https://buzzedison.com',
      location: 'San Francisco, CA'
    },
    notifications: {
      emailNotifications: true,
      newComments: true,
      articleUpdates: false,
      newsletter: true,
      marketingEmails: false
    },
    privacy: {
      profileVisibility: 'public',
      showReadingHistory: false,
      showLikedArticles: true,
      allowComments: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'America/Los_Angeles',
      articlesPerPage: 10
    }
  });

  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Shield },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'account', label: 'Account', icon: AlertTriangle }
  ];

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save settings to database
      // await supabase.from('user_settings').upsert(settings);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message (you could add a toast notification here)
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleProfileUpdate = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  const handleNotificationToggle = (field: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [field]: !prev.notifications[field as keyof typeof prev.notifications]
      }
    }));
  };

  const handlePrivacyToggle = (field: string) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [field]: field === 'profileVisibility' 
          ? (prev.privacy.profileVisibility === 'public' ? 'private' : 'public')
          : !prev.privacy[field as keyof typeof prev.privacy]
      }
    }));
  };

  const handlePreferenceUpdate = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [field]: value
      }
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Avatar */}
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            {settings.profile.avatar ? (
              <Image
                src={settings.profile.avatar}
                alt={settings.profile.name}
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl font-semibold text-gray-600">
                {settings.profile.name.charAt(0)}
              </div>
            )}
          </div>
          <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
            <Camera className="h-4 w-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Profile Photo</h3>
          <p className="text-sm text-gray-600">Upload a photo to personalize your profile</p>
        </div>
      </div>

      {/* Profile Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={settings.profile.name}
            onChange={(e) => handleProfileUpdate('name', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={settings.profile.email}
            onChange={(e) => handleProfileUpdate('email', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
          <input
            type="url"
            value={settings.profile.website}
            onChange={(e) => handleProfileUpdate('website', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://yourwebsite.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={settings.profile.location}
            onChange={(e) => handleProfileUpdate('location', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="City, Country"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
        <textarea
          value={settings.profile.bio}
          onChange={(e) => handleProfileUpdate('bio', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Tell others about yourself..."
        />
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Notifications</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <p className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                  {key === 'newComments' && 'Get notified when someone comments on your articles'}
                  {key === 'articleUpdates' && 'Receive updates about new articles from your favorite authors'}
                  {key === 'newsletter' && 'Weekly newsletter with curated content and insights'}
                  {key === 'marketingEmails' && 'Promotional emails about new features and offers'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={cn(
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  value ? "bg-blue-600" : "bg-gray-200"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    value ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900">Profile Visibility</label>
              <p className="text-sm text-gray-600">Control who can see your profile information</p>
            </div>
            <select
              value={settings.privacy.profileVisibility}
              onChange={(e) => handlePrivacyToggle('profileVisibility')}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          {['showReadingHistory', 'showLikedArticles', 'allowComments'].map((key) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                </label>
                <p className="text-sm text-gray-600">
                  {key === 'showReadingHistory' && 'Allow others to see articles you\'ve read'}
                  {key === 'showLikedArticles' && 'Show articles you\'ve liked on your profile'}
                  {key === 'allowComments' && 'Allow others to comment on your content'}
                </p>
              </div>
              <button
                onClick={() => handlePrivacyToggle(key)}
                className={cn(
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
                  settings.privacy[key as keyof typeof settings.privacy] ? "bg-blue-600" : "bg-gray-200"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    settings.privacy[key as keyof typeof settings.privacy] ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
          <select
            value={settings.preferences.theme}
            onChange={(e) => handlePreferenceUpdate('theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={settings.preferences.language}
            onChange={(e) => handlePreferenceUpdate('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={settings.preferences.timezone}
            onChange={(e) => handlePreferenceUpdate('timezone', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="Europe/London">GMT</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Articles per page</label>
          <select
            value={settings.preferences.articlesPerPage}
            onChange={(e) => handlePreferenceUpdate('articlesPerPage', parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mr-3 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-yellow-800">Danger Zone</h3>
            <p className="text-sm text-yellow-700 mt-1">
              These actions cannot be undone. Please be careful.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-red-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Delete Account</h4>
              <p className="text-sm text-gray-600 mt-1">
                Permanently delete your account and all associated data. This action cannot be reversed.
              </p>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Delete Account</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete your account? This will permanently remove all your data, including your profile, comments, and reading history. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle account deletion
                  setShowDeleteModal(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <DashboardLayout title="Settings" subtitle="Manage your account settings and preferences">
      <div className="space-y-6">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors",
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'privacy' && renderPrivacyTab()}
            {activeTab === 'preferences' && renderPreferencesTab()}
            {activeTab === 'account' && renderAccountTab()}
          </div>
        </div>

        {/* Save Button */}
        {activeTab !== 'account' && (
          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 