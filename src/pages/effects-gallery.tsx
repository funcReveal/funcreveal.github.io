import Layout from '@/components/Layout'
import Link from "next/link"
import React from "react"
import { NextSeo } from 'next-seo'

const EffectsGallery = () => {
    return (
        <>
            <NextSeo title="特效集 | funcReveal" description="這是我的特效集頁面。" />

            <Layout>
                <Link href={"/"}>
                    Home
                </Link>
            </Layout>
        </>
    )
}

export default EffectsGallery