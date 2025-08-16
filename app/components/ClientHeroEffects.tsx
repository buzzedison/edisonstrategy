'use client'

import dynamic from 'next/dynamic'

// Use dynamic import with ssr: false inside a client component
const HeroEffects = dynamic(() => import('./HeroEffects'), { ssr: false })

export default function ClientHeroEffects() {
  return <HeroEffects />
} 