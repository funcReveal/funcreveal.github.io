import Link from 'next/link'
import { effects } from '@/lib/effects'
import { NextSeo } from 'next-seo'
import Layout from '@/components/Layout'
import { Box, Card, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { GitHub } from '@mui/icons-material'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface effectProps {
    slug: string;
    titles: {
        [lang: string]: string;
    };
    descriptions: {
        [lang: string]: string;
    };
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3, backgroundColor: 'burlywood' }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function EffectCard({ effect, views }: { effect: effectProps, views: number }) {

    const handleClick = async () => {
        try {
            const url = `https://view-counter.funcreveal.workers.dev/?slug=${effect.slug}`

            navigator.sendBeacon(url)
        } catch (err) {
            console.error('Failed to increment view', err)
        }
    }

    return (
        <Card sx={{ p: 2, mb: '15px', borderRadius: 2, boxShadow: 8 }}>
            <Box display={'flex'} flexDirection={'row'} gap={'10px'} alignItems={'center'}>
                <Box width={'100px'} height={'100px'} flexShrink={0}>
                    <video
                        src={`/videos/${effect.slug}.webm`}
                        preload="none"
                        muted
                        loop
                        playsInline
                        style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '10px' }}
                        onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
                        onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                    />
                </Box>
                <Box flex={1} display={'flex'} flexDirection={'column'} justifyContent={'space-between'} minHeight={'100px'}>
                    <Box>
                        <Link
                            href={`/effects/${effect.slug}`}
                            onClick={handleClick}
                            style={{
                                color: 'var(--background)',
                                fontWeight: '600'
                            }}
                        >
                            {effect.titles['en']}
                        </Link>
                        <Typography
                            color={'gray'}
                            title={effect.descriptions['en']}
                            display={'-webkit-box'}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            sx={{
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical'
                            }}
                        >
                            {effect.descriptions['en']}
                        </Typography>
                    </Box>

                    <Box display={'flex'} justifyContent={'space-between'}>
                        <GitHub />
                        <Typography>
                            {views ?? '...'} views
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Card>
    )
}


export default function EffectsGallery() {
    const [value, setValue] = useState(0)

    const [allViews, setAllViews] = useState<Record<string, number>>({})

    useEffect(() => {
        const fetchAllViews = async () => {
            const cached = sessionStorage.getItem('funcReveal_allViews')
            const cachedTime = sessionStorage.getItem('funcReveal_allViews_time')
            const now = Date.now()

            // expiration 5 minute
            if (cached && cachedTime && now - parseInt(cachedTime) < 5 * 60 * 1000) {
                const parsed = JSON.parse(cached)
                setAllViews(parsed)
                return
            }

            try {
                const slugs = effects.map(e => e.slug).join(',')
                const res = await fetch(`https://view-counter.funcreveal.workers.dev/?slugs=${slugs}&queryOnly=1`)
                const data = await res.json()

                setAllViews(data.views || {})
                sessionStorage.setItem('funcReveal_allViews', JSON.stringify(data.views || {}))
                sessionStorage.setItem('funcReveal_allViews_time', now.toString())
            } catch (err) {
                console.error('Failed to fetch all views', err)
            }
        }

        fetchAllViews()
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    };

    const tabsStyles = {
        color: 'var(--foreground)',
        backgroundColor: 'var(--background)',
    }

    const tabStyles = {
        color: 'var(--foreground)',
        backgroundColor: 'var(--background)',
        '&.Mui-selected': {
            color: 'red',
            borderColor: 'red',
        }
    }

    return (
        <>
            <Layout>
                <NextSeo
                    title="Effects Gallery | funcReveal"
                    description="A list of interactive CSS + JS effects."
                    canonical="https://funcreveal.github.io/effects-gallery/"
                    languageAlternates={[
                        { hrefLang: 'zh-TW', href: 'https://funcreveal.github.io/zh-TW/effects-gallery/' },
                        { hrefLang: 'zh-CN', href: 'https://funcreveal.github.io/zh-CN/effects-gallery/' },
                    ]}
                />
                <Box sx={{ backgroundColor: 'gray' }}>
                    <Box sx={{ borderBottom: 1 }}>
                        <Tabs
                            slotProps={{
                                indicator: { sx: { backgroundColor: 'red' } }
                            }}
                            sx={tabsStyles}
                            value={value}
                            onChange={handleChange}
                            aria-label="category tabs"
                        >
                            <Tab sx={tabStyles} label="NEWEST" {...a11yProps(0)} />
                            <Tab sx={tabStyles} label="POPULAR" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box
                            display={'grid'}
                            gridTemplateColumns={{
                                xs: '1fr',
                                md: '1fr 1fr',
                                xl: '1fr 1fr 1fr'
                            }}
                            columnGap={'15px'}
                        >
                            {effects.map((effect) => (
                                <EffectCard key={effect.slug} effect={effect} views={allViews[effect.slug] ?? 0} />
                            ))}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box
                            display={'grid'}
                            gridTemplateColumns={{
                                xs: '1fr',
                                md: '1fr 1fr',
                                xl: '1fr 1fr 1fr'
                            }}
                            columnGap={'15px'}
                        >
                            {effects.map((effect) => (
                                <EffectCard key={effect.slug} effect={effect} views={allViews[effect.slug] ?? 0} />
                            ))}
                        </Box>
                    </CustomTabPanel>
                </Box>
            </Layout>
        </>
    )
}
