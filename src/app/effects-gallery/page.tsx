import Layout from "@/components/common/Layout"
import Head from "next/head"
import Link from "next/link"
import React from "react"

const index = () => {
    return (
        <>
            <Head>
                <title>Effects Gallery</title>
                <meta name="description" content="A collection of CSS and Javascript effects for web development." />
            </Head>
            <Layout>
                <Link href={"/"}  >
                    Home
                </Link>
                <div>index</div>
            </Layout>
        </>
    )
}

export default index