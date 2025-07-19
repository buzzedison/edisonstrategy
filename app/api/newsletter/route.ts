import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing subscriber:', checkError);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    if (existingSubscriber) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    }

    // Add new subscriber
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email,
          subscribed_at: new Date().toISOString(),
          status: 'active'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error adding subscriber:', error);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    // Here you could also integrate with external services like:
    // - Mailchimp
    // - ConvertKit
    // - SendGrid
    // - Resend
    // Example:
    // await addToMailchimp(email);

    return NextResponse.json({ 
      message: 'Successfully subscribed to newsletter',
      subscriber: data
    }, { status: 201 });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // Get newsletter subscriber count (optional endpoint for analytics)
    const { count, error } = await supabase
      .from('newsletter_subscribers')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    if (error) {
      console.error('Error getting subscriber count:', error);
      return NextResponse.json({ error: 'Failed to get subscriber count' }, { status: 500 });
    }

    return NextResponse.json({ 
      subscriberCount: count || 0 
    }, { status: 200 });

  } catch (error) {
    console.error('Newsletter API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 