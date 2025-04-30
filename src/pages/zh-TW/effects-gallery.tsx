import Link from 'next/link'
import { effects } from '@/lib/effects'
import { NextSeo } from 'next-seo'

export default function EffectsGallery() {
    return (
        <>
            <NextSeo
                title="特效總覽 | funcReveal"
                description="各種 CSS + JS 特效的集合。"
                canonical="https://funcreveal.github.io/zh-TW/effects-gallery/"
            />
            <h1>特效總覽</h1>
            <ul>
                {effects.map((effect) => (
                    <li key={effect.slug}>
                        <Link href={`/zh-TW/effects/${effect.slug}`}>
                            {effect.titles['zh-TW']}
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
