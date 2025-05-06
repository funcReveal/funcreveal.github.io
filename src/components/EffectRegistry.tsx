import dynamic from 'next/dynamic'
import { JSX } from 'react'

const GlowButton = dynamic(() => import('./effects/BreathingLight/BreathingLight'), { ssr: false })
const AnimatedBorder = dynamic(() => import('./effects/AnimatedBorder/AnimatedBorder'), { ssr: false })
const BreathingLight = dynamic(() => import('./effects/BreathingLight/BreathingLight'), { ssr: false })

const registry: Record<string, JSX.Element> = {
    'glow-button': <GlowButton />,
    'animated-border': <AnimatedBorder />,
    'breathing-light': <BreathingLight />,
    // Add more: 'effect-slug': <Component />
}

export function getEffectComponent(slug: string): JSX.Element | null {
    return registry[slug] || null
}