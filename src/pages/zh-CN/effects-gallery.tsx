import React, { useState } from 'react'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import { Box, Card, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { GitHub } from '@mui/icons-material'

import { effects } from '@/lib/effects'
import Layout from '@/components/Layout'
import { useFetchAllViews } from '@/shared/viewCounter'

import styles from '@/styles/effects-gallery.module.css'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface effectProps {
    slug: string;
    titles?: {
        [lang: string]: string | undefined;
    };
    descriptions?: {
        [lang: string]: string | undefined;
    };
    component?: string;
    createdTime?: {
        time: number;
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;
    };
    type?: string;
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
            {value === index && <Box sx={{ p: 3, backgroundColor: 'var(--background-80)' }}>{children}</Box>}
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
    return (
        <Card
            className={styles.animatedBorder}
            sx={{
                position: 'relative',
                overflow: 'hidden',
                zIndex: 0,
                bgcolor: 'var(--foreground)',
                p: 2,
                mb: '15px',
                borderRadius: '10px',
            }}
        >
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
                        <Box display={'flex'} justifyContent={'space-between'}>
                            <Link
                                href={`/zh-CN/effects/${effect.slug}`}
                                style={{
                                    color: 'var(--background)',
                                    fontWeight: '600'
                                }}
                            >
                                {effect.titles && effect.titles['zh-CN'] ? effect.titles['zh-CN'] : ''}
                            </Link>
                            <Typography color='gray' fontSize={'15px'} sx={{ transform: 'translateY(-5px) translateX(3px)' }}>
                                {effect.createdTime?.year}-
                                {effect.createdTime?.month}-
                                {effect.createdTime?.day}
                            </Typography>
                        </Box>
                        <Typography
                            color={'#6e6e6e'}
                            title={effect.descriptions && effect.descriptions['zh-CN'] ? effect.descriptions['zh-CN'] : ''}
                            display={'-webkit-box'}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            sx={{
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                            }}
                        >
                            {effect.descriptions && effect.descriptions['zh-CN'] ? effect.descriptions['zh-CN'] : ''}
                        </Typography>
                    </Box>

                    <Box display={'flex'} justifyContent={'space-between'}>
                        <GitHub />
                        <Typography>
                            {views ? `观看次数：${views}` : <Skeleton width={'80px'} animation="wave" />}
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

    useFetchAllViews({ setAllViews });

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
                    title="特效总览 | funcReveal"
                    description="各种 CSS + JS 特效的集合。"
                    canonical="https://funcreveal.github.io/zh-CN/effects-gallery/"
                    languageAlternates={[
                        { hrefLang: 'en', href: 'https://funcreveal.github.io/effects-gallery/' },
                        { hrefLang: 'zh-TW', href: 'https://funcreveal.github.io/zh-TW/effects-gallery/' },
                    ]}
                />
                <Box sx={{ backgroundColor: 'gray' }}>
                    <Box>
                        <Tabs
                            slotProps={{
                                indicator: { sx: { backgroundColor: 'red' } }
                            }}
                            sx={tabsStyles}
                            value={value}
                            onChange={handleChange}
                            aria-label="category tabs"
                        >
                            <Tab sx={tabStyles} label="最新发布" {...a11yProps(0)} />
                            <Tab sx={tabStyles} label="热门趋势" {...a11yProps(1)} />
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
                            {[...effects]
                                .sort((a, b) => b.createdTime.time - a.createdTime.time)
                                .map((effect) => (
                                    <EffectCard key={effect.slug} effect={effect} views={allViews[effect.slug] ?? 0} />
                                ))
                            }
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
                            {[...effects]
                                .sort((a, b) => (allViews[b.slug] ?? 0) - (allViews[a.slug] ?? 0))
                                .map((effect) => (
                                    <EffectCard key={effect.slug} effect={effect} views={allViews[effect.slug] ?? 0} />
                                ))
                            }
                        </Box>
                    </CustomTabPanel>
                </Box>
            </Layout>
        </>
    )
}
