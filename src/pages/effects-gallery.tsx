import Link from 'next/link'
import { effects } from '@/lib/effects'
import { NextSeo } from 'next-seo'
import Layout from '@/components/Layout'

export default function EffectsGallery() {
    return (
        <>
            <Layout>
                <NextSeo
                    title="Effects Gallery | funcReveal"
                    description="A list of interactive CSS + JS effects."
                    canonical="https://funcreveal.github.io/effects-gallery/"
                />
                <h1>Effects Gallery</h1>
                <ul>
                    {effects.map((effect) => (
                        <li key={effect.slug}>
                            <Link href={`/effects/${effect.slug}`}>
                                {effect.titles['en']}
                            </Link>
                        </li>
                    ))}
                </ul>
            </Layout>
        </>
    )
}
