import { Html, Main, NextScript, Head } from "next/document"
import Script from "next/script"

const MainDocument = (): JSX.Element => {
    return (
        <Html lang="en">
            <Head>
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
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default MainDocument
