import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main style={{ backgroundColor: 'transparent' }}>{children}</main>
            <Footer />
        </>
    )
}
