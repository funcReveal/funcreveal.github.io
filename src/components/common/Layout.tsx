import Head from 'next/head'
import Navbar from './Navbar'
import Footer from './Footer'
import '@/styles/globals.css'

interface LayoutProps {
    children: React.ReactNode
    title?: string
    description?: string
}

export default function Layout({ children, title = 'funcReveal', description = '展示 CSS + JS 特效' }: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="CSS, JavaScript, funcReveal, Web Animation, Frontend, 前端特效" />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
