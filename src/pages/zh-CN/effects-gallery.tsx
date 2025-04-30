import Link from 'next/link'
import { effects } from '@/lib/effects'
import { NextSeo } from 'next-seo'

export default function EffectsGallery() {
    return (
        <>
            <NextSeo
                title="特效总览 | funcReveal"
                description="各种 CSS + JS 特效的集合。"
                canonical="https://funcreveal.github.io/zh-CN/effects-gallery/"
            />
            <h1>特效总览</h1>
            <ul>
                {effects.map((effect) => (
                    <li key={effect.slug}>
                        <Link href={`/zh-CN/effects/${effect.slug}`}>
                            {effect.titles['zh-CN']}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
