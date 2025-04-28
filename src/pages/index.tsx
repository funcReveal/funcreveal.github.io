import Layout from "@/components/common/Layout"
import Head from "next/head"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Head>
        <title>funcReveal</title>
        <meta name="description" content="A collection of CSS and Javascript effects for web development." />
      </Head>
      <Layout>
        <h1>歡迎來到 funcReveal</h1>
        <Link href={"effects-gallery"}>
          effects-gallery
        </Link>
        {/* 其他內容 */}
      </Layout>
    </>
  );
}
