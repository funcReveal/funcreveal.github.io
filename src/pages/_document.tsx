import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta charSet="UTF-8" />
                <meta name="description" content="funcReveal official site showcasing effects and useful tools." />

                <meta property="og:site_name" content="funcReveal" />
                <meta property="og:title" content="funcReveal" />
                <meta property="og:description" content="Explore beautifully crafted web effects and enhance your website experience." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="/og-image.png" />
                <meta property="og:url" content="https://funcreveal.github.io" />

                <link rel="icon" href="/favicon.ico" />

                {/* ✅ Future-proof: custom fonts or extra meta can go here */}
                {/* <link rel="preconnect" href="https://fonts.googleapis.com" /> */}
                {/* <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=YourFontName&display=swap" /> */}
            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
