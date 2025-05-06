import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import { Box } from '@mui/material'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight="100vh"
        >
            <Header />
            <Box component="main" flexGrow={1}>
                {children}
            </Box>
            <Footer />
        </Box>
    )
}
