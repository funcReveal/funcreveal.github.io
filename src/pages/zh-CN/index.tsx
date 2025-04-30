import Layout from '@/components/Layout'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

export default function HomeZhCN() {
    return (
        <>
            <Layout>
                <NextSeo
                    title="funcReveal"
                    description="展示 CSS + JS 特效的官方网站。"
                    canonical="https://funcreveal.github.io/zh-CN/"
                    languageAlternates={[
                        { hrefLang: 'en', href: 'https://funcreveal.github.io/' },
                        { hrefLang: 'zh-TW', href: 'https://funcreveal.github.io/zh-TW/' },
                    ]}
                />
                <section className="text-center p-8">
                    <h1 className="text-3xl font-bold">funcReveal</h1>
                    <p className="mt-4 text-lg">陈列 CSS + JavaScript 特效.</p>
                    <Link href={'/zh-CN/effects-gallery'}>现在就去看看特效集</Link>
                </section>
            </Layout>
        </>
    )
}
