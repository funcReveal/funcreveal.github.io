import { NextSeo } from 'next-seo'
import { Box } from '@mui/material';

import { getEffectComponent } from './EffectRegistry'
import Layout from './Layout';
import CodePreview from './common/CodePreview/CodePreview';
import { useTrackView } from '@/shared/hooks/viewCounter';

import { effectsMap } from '@/lib/effects'
import { effectSources } from '@/lib/effectSources'
import Sidebar from './Sidebar';

export default function EffectPage({ slug, locale }: { slug: string; locale: 'en' | 'zh-TW' | 'zh-CN' }) {
    const effect = effectsMap.get(slug)
    const Demo = getEffectComponent(slug)
    const source = effectSources[slug]

    useTrackView(slug)

    if (!effect) {
        return <p>{locale === 'zh-CN' ? '页面未找到' : locale === 'zh-TW' ? '找不到頁面' : 'Page not found'}</p>
    }

    const sidebarItems = Array.from(effectsMap.entries()).map(([slug, effect]) => ({
        slug,
        label: effect.titles[locale] || slug,
    }));

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

                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ width: '10%' }}>
                        <Sidebar items={sidebarItems} locale={locale} />
                    </Box>

                    <Box sx={{ width: '90%' }}>
                        <h1>{effect.titles[locale]}</h1>
                        <p>{effect.descriptions[locale]}</p>

                        {Demo ? (
                            <Box my={'50px'} display={'flex'} justifyContent={'center'}>
                                {Demo}
                            </Box>
                        ) : (
                            <p style={{ color: 'gray' }}>No demo available.</p>
                        )}

                        {source?.tsxCode && source?.cssCode ? (
                            <CodePreview
                                tsxCode={source.tsxCode}
                                cssCode={source.cssCode}
                                githubUrl={source.githubUrl}
                                TSXName={source.TSXName}
                                CSSName={source.CSSName}
                            />
                        ) : null}
                    </Box>
                </Box>
            </Layout>
        </>
    );
}