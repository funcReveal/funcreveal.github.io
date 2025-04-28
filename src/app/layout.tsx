import '@/styles/globals.css';
import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

export const metadata: Metadata = {
    metadataBase: new URL('https://funcreveal.github.io'),
    title: {
        default: 'funcReveal',
        template: '%s | funcReveal',
    },
    description: '展示 CSS + JS 特效的官方網站。',
    keywords: ['CSS', 'JavaScript', 'funcReveal', 'Web Animation', 'Frontend', '特效'],
    openGraph: {
        title: 'funcReveal - 展示 CSS + JS 特效',
        description: '展示 CSS + JS 特效的官方網站。',
        url: 'https://你的domain/funcReveal-official',
        siteName: 'funcReveal',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
            },
        ],
        type: 'website',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Header />
                <Navbar />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
