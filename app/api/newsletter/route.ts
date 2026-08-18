// app/api/newsletter/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, source, fields } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: 'Enter a valid email address' },
        { status: 400 }
      );
    }

    const safeFields = fields && typeof fields === 'object'
      ? Object.fromEntries(
          Object.entries(fields)
            .filter(([, value]) => typeof value === 'string' || typeof value === 'number')
            .map(([key, value]) => [key, String(value).slice(0, 120)])
        )
      : {};

    // Kit API configuration
    const KIT_API_KEY = process.env.KIT_API_KEY;
    const KIT_FORM_ID = process.env.KIT_FORM_ID;

    if (!KIT_API_KEY || !KIT_FORM_ID) {
      console.error('Missing Kit configuration:', { 
        hasApiKey: !!KIT_API_KEY, 
        hasFormId: !!KIT_FORM_ID 
      });
      return NextResponse.json(
        { error: 'Newsletter service not configured' },
        { status: 500 }
      );
    }

    // Subscribe to Kit
    const kitResponse = await fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email,
        first_name: firstName || '',
        last_name: lastName || '',
        fields: {
          ...safeFields,
          ...(source ? { signup_source: String(source).slice(0, 80) } : {}),
        },
      }),
    });

    const kitData = await kitResponse.json();

    if (!kitResponse.ok) {
      console.error('Kit API error:', kitData);
      return NextResponse.json(
        { error: kitData.message || 'Failed to subscribe' },
        { status: kitResponse.status }
      );
    }

    console.log('Successfully subscribed to Kit:', { email, subscriber_id: kitData.subscription?.subscriber?.id });

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!',
      subscriber: kitData.subscription?.subscriber
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
