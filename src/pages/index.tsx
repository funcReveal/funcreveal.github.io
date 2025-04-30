import { NextSeo } from 'next-seo'
import Link from 'next/link'

import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <NextSeo
        title="funcReveal"
        description="Explore CSS + JavaScript effects."
        canonical="https://funcreveal.github.io/"
        languageAlternates={[
          { hrefLang: 'zh-TW', href: 'https://funcreveal.github.io/zh-TW' },
          { hrefLang: 'zh-CN', href: 'https://funcreveal.github.io/zh-CN/' },
        ]}
      />
      <section className="text-center p-8">
        <h1 className="text-3xl font-bold">funcReveal</h1>
        <p className="mt-4 text-lg">Explore CSS + JavaScript effects.</p>
        <Link href={'effects-gallery'}>Go effects-gallery</Link>
      </section>
    </Layout>
  )
}