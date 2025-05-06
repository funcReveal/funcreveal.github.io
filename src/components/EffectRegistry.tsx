import dynamic from 'next/dynamic'
import { JSX } from 'react'

const GlowButton = dynamic(() => import('./effects/GlowButton/GlowButton'), { ssr: false })
const AnimatedBorder = dynamic(() => import('./effects/AnimatedBorder/AnimatedBorder'), { ssr: false })

const registry: Record<string, JSX.Element> = {
    'glow-button': <GlowButton />,
    'animated-border': <AnimatedBorder />,
    // Add more: 'effect-slug': <Component />
}

export function getEffectComponent(slug: string): JSX.Element | null {
    return registry[slug] || null
}