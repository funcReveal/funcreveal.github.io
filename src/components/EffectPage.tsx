import { NextSeo } from 'next-seo'
import { effects } from '@/lib/effects'
import { getEffectComponent } from './EffectRegistry'
import Layout from './Layout';
import { Box } from '@mui/material';

export default function EffectPage({ slug, locale }: { slug: string; locale: 'en' | 'zh-TW' | 'zh-CN' }) {
    const effect = effects.find((e) => e.slug === slug)
    const Demo = getEffectComponent(slug)

    if (!effect) {
        return <p>{locale === 'zh-CN' ? '页面未找到' : locale === 'zh-TW' ? '找不到頁面' : 'Page not found'}</p>
    }

    return (
        <>
            <Layout>

                <NextSeo
                    title={`funcReveal | ${effect.titles[locale]}`}
                    description={effect.descriptions[locale]}
                    canonical={`https://funcreveal.github.io${locale === 'en' ? '' : `/${locale}`}/effects/${slug}/`}
                    languageAlternates={[
                        { hrefLang: 'en', href: `https://funcreveal.github.io/effects/${slug}/` },
                        { hrefLang: 'zh-TW', href: `https://funcreveal.github.io/zh-TW/effects/${slug}/` },
                        { hrefLang: 'zh-CN', href: `https://funcreveal.github.io/zh-CN/effects/${slug}/` },
                    ]}
                />
                <h1>{effect.titles[locale]}</h1>
                <p>{effect.descriptions[locale]}</p>

                {Demo ? <Box marginTop={'50px'} display={'flex'} justifyContent={'center'}>{Demo}</Box> : <p style={{ color: 'gray' }}>No demo available.</p>}

            </Layout>
        </>
    )
}