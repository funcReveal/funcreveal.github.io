import Layout from '@/components/Layout'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function HomeZhTW() {
    return (
        <>
            <Layout>
                <NextSeo
                    title="funcReveal"
                    description="展示 CSS + JS 特效的官方網站。"
                    canonical="https://funcreveal.github.io/zh-TW/"
                    languageAlternates={[
                        { hrefLang: 'en', href: 'https://funcreveal.github.io/' },
                        { hrefLang: 'zh-CN', href: 'https://funcreveal.github.io/zh-CN/' },
                    ]}
                />
                <section className="text-center p-8">
                    <h1 className="text-3xl font-bold">funcReveal</h1>
                    <p className="mt-4 text-lg">探索 CSS + JavaScript 特效.</p>
                    <Link href={'/zh-TW/effects-gallery'}>前往特效集</Link>
                </section>
            </Layout>
        </>
    )
}
