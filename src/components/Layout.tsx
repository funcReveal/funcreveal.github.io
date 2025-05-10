import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { Box } from '@mui/material'
import Head from 'next/head'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Head>
                <meta name="keywords" content="CSS effects, JavaScript, React, frontend demo, web animation" />
            </Head>
            <Box
                display="flex"
                flexDirection="column"
                minHeight="100vh"
            >
                <Header />
                <Box component="main" flexGrow={1} >
                    {children}
                </Box>
                <Footer />
            </Box>
        </>
    )
}
