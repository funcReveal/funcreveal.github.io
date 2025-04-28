import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import '@/styles/globals.css'
import Header from './Header'

interface LayoutProps {
    children: React.ReactNode
    title?: string
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="CSS, JavaScript, funcReveal, Web Animation, Frontend, 前端特效" />
                <meta property="og:title" content="funcReveal - 展示 CSS + JS 特效" />
                <meta property="og:description" content="展示各種 CSS + JavaScript 特效，讓前端創意無限發揮。funcReveal 官方網站。" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://funcreveal.github.io" />
                <meta property="og:image" content="https://funcreveal.github.io/og-image.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Header />
            <main>{children}</main>
            <Navbar />
            <Footer />
        </>
    );
}
