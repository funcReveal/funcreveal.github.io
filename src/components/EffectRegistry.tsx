// import dynamic from 'next/dynamic'
import ButtonGlow from './effects/ButtonGlow'

const registry: Record<string, JSX.Element> = {
    'button-glow': <ButtonGlow />,
    // Add more: 'effect-slug': <Component />
}

export function getEffectComponent(slug: string): JSX.Element | null {
    return registry[slug] || null
}