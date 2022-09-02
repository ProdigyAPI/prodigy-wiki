import { Html, Main, NextScript, Head } from "next/document"
import Script from "next/script"

const MainDocument = (): JSX.Element => {
    return (
        <Html lang="en">
            <Head>
                <meta name="theme-color" content="#524CFD" />
                <meta name="twitter:image" content="/prodigy-wiki-icon.png" />
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-77D52LPYJ9"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', 'G-77D52LPYJ9');
                    `}
                </Script>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8981394123170949"
                    crossOrigin="anonymous"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default MainDocument
