import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ height: '100vh' }}>
            <Header />
            <main style={{ height: '100%', width: '100%', backgroundColor: 'transparent' }}>{children}</main >
            <Footer />
        </div>
    )
}
