import dynamic from 'next/dynamic'
import { JSX } from 'react'

const GlowButton = dynamic(() => import('./effects/GlowButton/GlowButton'), { ssr: false })
const AnimatedBorder = dynamic(() => import('./effects/AnimatedBorder/AnimatedBorder'), { ssr: false })
const BreathingLight = dynamic(() => import('./effects/BreathingLight/BreathingLight'), { ssr: false })
const HeartTree = dynamic(() => import('./effects/HeartTree/HeartTree'), { ssr: false })
const HeartTreeClick = dynamic(() => import('./effects/HeartTreeClick/HeartTreeClick'), { ssr: false })

const registry: Record<string, JSX.Element> = {
    'glow-button': <GlowButton />,
    'animated-border': <AnimatedBorder />,
    'breathing-light': <BreathingLight />,
    'heart-tree': <HeartTree />,
    'heart-tree-click': <HeartTreeClick />,
    // Add more: 'effect-slug': <Component />
}

export function getEffectComponent(slug: string): JSX.Element | null {
    return registry[slug] || null
}