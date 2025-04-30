// components/Layout.tsx
import Header from '@/components/common/Header'
import Navbar from '@/components/common/Navbar'
import Footer from '@/components/common/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    )
}
