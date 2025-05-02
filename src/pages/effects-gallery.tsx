import Link from 'next/link'
import { effects } from '@/lib/effects'
import { NextSeo } from 'next-seo'
import Layout from '@/components/Layout'
import { Box, Card, Tab, Tabs } from '@mui/material'
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
    return (
        <>
            <Layout>
                <NextSeo
                    title="Effects Gallery | funcReveal"
                    description="A list of interactive CSS + JS effects."
                    canonical="https://funcreveal.github.io/effects-gallery/"
                />
                <Box sx={{ backgroundColor: 'gray' }} >
                    <Box sx={{ borderBottom: 1 }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="NEWEST" {...a11yProps(0)} />
                            <Tab label="POPULAR" {...a11yProps(1)} />
                            <Tab label="Item Three" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
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
