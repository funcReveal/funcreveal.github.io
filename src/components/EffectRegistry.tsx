import dynamic from 'next/dynamic'
import { JSX } from 'react'

const GlowButton = dynamic(() => import('./effects/GlowButton/GlowButton'), { ssr: false })
const AnimatedBorder = dynamic(() => import('./effects/AnimatedBorder/AnimatedBorder'), { ssr: false })
const BreathingLight = dynamic(() => import('./effects/BreathingLight/BreathingLight'), { ssr: false })
const HeartTree = dynamic(() => import('./effects/FallingParticles/FallingParticles'), { ssr: false })
const FallingParticles = dynamic(() => import('./showcase/FallingParticles/FallingParticles'), { ssr: false })

const registry: Record<string, JSX.Element> = {
    'glow-button': <GlowButton />,
    'animated-border': <AnimatedBorder />,
    'breathing-light': <BreathingLight />,
    'heart-tree': <HeartTree />,
    'falling-particles': <FallingParticles />,
    // Add more: 'effect-slug': <Component />
}

export function getEffectComponent(slug: string): JSX.Element | null {
    return registry[slug] || null
}