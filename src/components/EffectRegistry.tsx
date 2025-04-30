import dynamic from 'next/dynamic'
import { JSX } from 'react'

const ButtonGlow = dynamic(() => import('./effects/ButtonGlow'), { ssr: false })

const registry: Record<string, JSX.Element> = {
    'button-glow': <ButtonGlow />,
    // Add more: 'effect-slug': <Component />
}

export function getEffectComponent(slug: string): JSX.Element | null {
    return registry[slug] || null
}