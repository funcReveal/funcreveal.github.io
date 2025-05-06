import Link from 'next/link'
import { effects } from '@/lib/effects'
import { NextSeo } from 'next-seo'
import Layout from '@/components/Layout'
import { Box, Card, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

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

export default function EffectsGallery() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
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
                        { hrefLang: 'zh-TW', href: 'https://funcreveal.github.io/zh-TW' },
                        { hrefLang: 'zh-CN', href: 'https://funcreveal.github.io/zh-CN/' },
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
                            <Tab sx={tabStyles} label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box sx={{}} >
                            {effects.map((effect) => (
                                <Card key={effect.slug} sx={{ p: 4, mb: 2 }}>
                                    <Box display={'flex'} flexDirection={'row'} gap={'10px'}>
                                        <Box sx={{
                                            width: '100px',
                                            height: '100px'
                                        }}>
                                            <video
                                                src={`/videos/${effect.slug}.webm`}
                                                preload="none"
                                                muted
                                                loop
                                                playsInline
                                                style={{ borderRadius: '10px', width: '100%', height: '100%', objectFit: 'cover' }}
                                                onMouseOver={(e) => (e.currentTarget as HTMLVideoElement).play()}
                                                onMouseOut={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                                            />
                                        </Box>
                                        <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
                                            <Box>
                                                <Link href={`/effects/${effect.slug}`}>
                                                    {effect.titles['en']}
                                                </Link>
                                                <Typography sx={{ color: 'gray' }}>
                                                    {effect.descriptions['en']}
                                                </Typography>
                                            </Box>
                                            <Box>
                                                github link
                                            </Box>
                                        </Box>
                                    </Box>
                                </Card>
                            ))}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <Box >
                            {effects.map((effect) => (
                                <Card key={effect.slug} sx={{ p: 4, mb: 2 }}>
                                    <Link href={`/effects/${effect.slug}`}>
                                        {effect.titles['en']}
                                    </Link>
                                </Card>
                            ))}
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        Item Three
                    </CustomTabPanel>
                </Box>
            </Layout>
        </>
    )
}
