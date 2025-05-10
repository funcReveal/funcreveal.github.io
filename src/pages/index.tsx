import React, { useState } from 'react'
import { NextSeo } from 'next-seo'
import Link from 'next/link'

import { Box, Chip, Typography } from '@mui/material'
import { EmojiEvents, TrendingUp } from '@mui/icons-material'

import Layout from '@/components/Layout'
import { effects } from '@/lib/effects'
import { useFetchAllViews } from '@/shared/viewCounter'

export default function Home() {
  const [allViews, setAllViews] = useState<Record<string, number>>({})

  useFetchAllViews({ setAllViews });

  // 大標題：
  // Creative Web Effects & Coding Inspiration

  // 副標題：
  // Explore modern CSS & JavaScript (React) effects. Free demos, source codes, and tutorials.

  // CTA（行動按鈕）：
  // View Effects Gallery / See Live Demos

  const topFive = Object.entries(allViews)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

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

      <Box display={'flex'} flexDirection={'column'} width={'100%'}>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} gap={'20px'} sx={{ m: 4 }} >
          <Box display={'flex'} alignItems={'center'}>
            <Typography sx={{ fontWeight: '700', letterSpacing: '0.2rem' }}>
              Trend
            </Typography>
            <TrendingUp sx={{ ml: '5px', color: 'rgb(130, 211, 38)' }} />
          </Box>
          <Box display={'flex'} gap={'15px'}>
            {topFive.map(([slug], index) => {
              const effect = effects.find(e => e.slug === slug);
              if (!effect) return null;

              const medalColor = index === 0 ? '#FFD700'
                : index === 1 ? '#C0C0C0'
                  : index === 2 ? '#CD7F32'
                    : undefined;

              return (
                <Link key={slug} href={`/effects/${slug}`}>
                  <Chip
                    icon={medalColor && <EmojiEvents />}
                    key={slug}
                    variant="outlined"
                    label={`${effect.titles['en']}`}
                    sx={{
                      py: 3,
                      px: 2,
                      color: 'var(--foreground)',
                      transition: 'opacity 0.2s',
                      '&:hover': {
                        cursor: 'pointer',
                        opacity: '0.7',
                        transition: 'opacity 0.2s',
                      },
                      '.MuiChip-icon': {
                        color: medalColor
                      }
                    }}
                  />
                </Link>
              )
            })}
          </Box>
        </Box>
        <Box display={'flex'} flexDirection={'column'}>
          <Box display={'flex'} sx={{ m: 4 }}>
            <Box
              sx={{
                width: '70%',
                minWidth: 'fit-content',
                backgroundColor: '#6e6e6e'
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  whiteSpace: 'nowrap',
                  p: 4
                }}
              >
                Shared effects component & notes
              </Typography>
            </Box>
            <Box
              sx={{
                width: '30%',
                minWidth: 'fit-content',
                backgroundColor: '#6e6e6e22'
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  p: 4
                }}
              >
                for 100% Free!
              </Typography>
            </Box>
          </Box>
          <Box display={'flex'} sx={{ m: 4 }}>
            <Box
              sx={{
                width: '30%',
                minWidth: 'fit-content',
                backgroundColor: '#6e6e6e22'
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  whiteSpace: 'nowrap',
                  p: 4
                }}
              >
                Effects Gallery
              </Typography>
            </Box>
            <Box
              sx={{
                width: '70%',
                minWidth: 'fit-content',
                backgroundColor: '#6e6e6e'
              }}
            >
              <Typography
                variant='h4'
                sx={{
                  p: 4,
                  whiteSpace: 'nowrap'
                }}
              >
                Explore modern CSS & React effects.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

    </Layout>
  )
}