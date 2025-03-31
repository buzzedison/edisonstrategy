import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (code) {
    const cookieStore = await cookies()
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          flowType: 'pkce',
          autoRefreshToken: false,
          persistSession: true,
          detectSessionInUrl: false,
          storage: {
            getItem: (key: string) => cookieStore.get(key)?.value ?? null,
            setItem: (key: string, value: string) => {
              cookieStore.set(key, value, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
            },
            removeItem: (key: string) => {
              cookieStore.set(key, '', { maxAge: 0 })
            },
          },
        },
      }
    )
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}

export async function POST(request: Request) {
  const { email, password, action } = await request.json()
  const cookieStore = await cookies()

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        flowType: 'pkce',
        autoRefreshToken: false,
        persistSession: true,
        detectSessionInUrl: false,
        storage: {
          getItem: (key: string) => cookieStore.get(key)?.value ?? null,
          setItem: (key: string, value: string) => {
            cookieStore.set(key, value, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
          },
          removeItem: (key: string) => {
            cookieStore.set(key, '', { maxAge: 0 })
          },
        },
      },
    }
  )

  if (action === 'signin') {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ user: data.user })
  }

  if (action === 'signup') {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    if (error) return NextResponse.json({ error: error.message }, { status: 400 })
    return NextResponse.json({ user: data.user })
  }

  return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
}