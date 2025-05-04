import React from 'react';
import { NextSeo } from 'next-seo'

import Layout from '@/components/Layout'
import { Box, Card, Tab, Tabs } from '@mui/material'

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

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
        <Box sx={{ backgroundColor: 'gray' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="最新" {...a11yProps(0)} />
            <Tab label="最熱門" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            <Box >
              <Card sx={{ p: 4, mb: 2 }}>
                step.1
              </Card>
              <Card sx={{ p: 4 }}>
                step.2
              </Card>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Box >
              <Card sx={{ p: 4, mb: 2 }}>
                lang.1
              </Card>
              <Card sx={{ p: 4 }}>
                lang.2
              </Card>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </section>
    </Layout>
  )
}