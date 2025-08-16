'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Mail, Calendar, Users, TrendingUp, Settings, Bell, Check, X } from 'lucide-react';
import DashboardLayout from '../../components/DashboardLayout';
import { cn } from '@/lib/utils';



interface NewsletterPreferences {
  isSubscribed: boolean;
  frequency: 'daily' | 'weekly' | 'monthly';
  topics: string[];
  format: 'html' | 'text';
}

export default function NewsletterPage() {
  const [preferences, setPreferences] = useState<NewsletterPreferences>({
    isSubscribed: true,
    frequency: 'weekly',
    topics: ['Business Strategy', 'Entrepreneurship', 'Technology'],
    format: 'html'
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const availableTopics = [
    'Business Strategy',
    'Entrepreneurship', 
    'Technology',
    'Marketing',
    'Product Development',
    'Fundraising',
    'Leadership',
    'Personal Development',
    'Industry News',
    'Case Studies'
  ];



  useEffect(() => {
    fetchNewsletterData();
  }, []);

  const fetchNewsletterData = async () => {
    try {
      setLoading(true);
      // Fetch user's newsletter preferences from database
      // const { data, error } = await supabase
      //   .from('newsletter_preferences')
      //   .select('*')
      //   .eq('user_id', userId)
      //   .single();

      // Mock data for now
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error fetching newsletter data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscriptionToggle = async () => {
    setSaving(true);
    try {
      const newStatus = !preferences.isSubscribed;
      
      // Update subscription status in database
      // await supabase
      //   .from('newsletter_preferences')
      //   .upsert({
      //     user_id: userId,
      //     is_subscribed: newStatus
      //   });

      setPreferences(prev => ({
        ...prev,
        isSubscribed: newStatus
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error updating subscription:', error);
    } finally {
      setSaving(false);
    }
  };

  const handlePreferenceUpdate = async (field: string, value: any) => {
    setSaving(true);
    try {
      // Update preferences in database
      // await supabase
      //   .from('newsletter_preferences')
      //   .upsert({
      //     user_id: userId,
      //     [field]: value
      //   });

      setPreferences(prev => ({
        ...prev,
        [field]: value
      }));

      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error('Error updating preferences:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleTopicToggle = (topic: string) => {
    const updatedTopics = preferences.topics.includes(topic)
      ? preferences.topics.filter(t => t !== topic)
      : [...preferences.topics, topic];
    
    handlePreferenceUpdate('topics', updatedTopics);
  };



  if (loading) {
    return (
      <DashboardLayout title="Newsletter" subtitle="Manage your newsletter subscription">
        <div className="animate-pulse space-y-6">
          <div className="bg-gray-200 rounded-xl h-32"></div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Newsletter Subscription" subtitle="Manage your newsletter preferences and topics">
      <div className="space-y-6">
        {/* Newsletter Info */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 border border-blue-100">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">BuzzEdison Newsletter</h2>
              <p className="text-gray-600">Strategic insights and actionable advice for founders and creators</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-blue-600" />
              <span>Weekly delivery every Monday</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span>Join thousands of subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span>Curated business insights</span>
            </div>
          </div>
        </div>

        {/* Subscription Settings */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Subscription Settings</h2>
            <p className="text-gray-600">Manage your newsletter subscription and preferences</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Subscription Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900">Newsletter Subscription</h3>
                <p className="text-sm text-gray-600">Receive our weekly newsletter with insights and updates</p>
              </div>
              <button
                onClick={handleSubscriptionToggle}
                disabled={saving}
                className={cn(
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50",
                  preferences.isSubscribed ? "bg-blue-600" : "bg-gray-200"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                    preferences.isSubscribed ? "translate-x-5" : "translate-x-0"
                  )}
                />
              </button>
            </div>

            {preferences.isSubscribed && (
              <>
                {/* Frequency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Frequency</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['daily', 'weekly', 'monthly'] as const).map((freq) => (
                      <button
                        key={freq}
                        onClick={() => handlePreferenceUpdate('frequency', freq)}
                        disabled={saving}
                        className={cn(
                          "p-3 text-center rounded-lg border-2 transition-colors disabled:opacity-50",
                          preferences.frequency === freq
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        <div className="font-medium capitalize">{freq}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {freq === 'daily' && 'Every day'}
                          {freq === 'weekly' && 'Once a week'}
                          {freq === 'monthly' && 'Once a month'}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Topics */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Topics of Interest</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {availableTopics.map((topic) => (
                      <button
                        key={topic}
                        onClick={() => handleTopicToggle(topic)}
                        disabled={saving}
                        className={cn(
                          "p-3 text-sm rounded-lg border-2 transition-colors disabled:opacity-50 flex items-center justify-center gap-2",
                          preferences.topics.includes(topic)
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-gray-300"
                        )}
                      >
                        {preferences.topics.includes(topic) && (
                          <Check className="h-3 w-3" />
                        )}
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Email Format</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      onClick={() => handlePreferenceUpdate('format', 'html')}
                      disabled={saving}
                      className={cn(
                        "p-4 text-left rounded-lg border-2 transition-colors disabled:opacity-50",
                        preferences.format === 'html'
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className="font-medium">HTML</div>
                      <div className="text-xs text-gray-500 mt-1">Rich formatting with images and styling</div>
                    </button>
                    <button
                      onClick={() => handlePreferenceUpdate('format', 'text')}
                      disabled={saving}
                      className={cn(
                        "p-4 text-left rounded-lg border-2 transition-colors disabled:opacity-50",
                        preferences.format === 'text'
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <div className="font-medium">Plain Text</div>
                      <div className="text-xs text-gray-500 mt-1">Simple text format without images</div>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Newsletter Benefits */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">What You'll Get</h2>
            <p className="text-gray-600">Valuable content delivered to your inbox</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Business Strategy</h3>
                  <p className="text-gray-600 text-sm">Actionable insights on pricing, product development, and growth strategies</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Entrepreneurship</h3>
                  <p className="text-gray-600 text-sm">Real-world advice from building startups to scaling businesses</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Settings className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Technology Insights</h3>
                  <p className="text-gray-600 text-sm">Latest trends in web development, SaaS, and digital products</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Weekly Updates</h3>
                  <p className="text-gray-600 text-sm">Curated content delivered every Monday morning</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Unsubscribe Notice */}
        {!preferences.isSubscribed && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start gap-3">
              <Bell className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800 mb-1">You're currently unsubscribed</h3>
                <p className="text-sm text-yellow-700">
                  You won't receive our newsletter updates. You can resubscribe anytime by toggling the subscription setting above.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
} 