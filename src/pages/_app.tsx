import React, { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import { Global, css, ThemeProvider, Theme } from "@emotion/react"
import NavigationBar from "../components/NavigationBar"
import { useRouter } from "next/router"
import Giscus from "@giscus/react"
import Head from "next/head"
import GoogleAdsenseAd from "../components/GoogleAdsenseAd"

export const siteRoot = "https://www.prodigywiki.com"

const lightTheme: Theme = {
    colors: {
        text: "#000",
        background: "#fff",
        navigationBar: "#27272A",
        navigationBarText: "#fff",
        megaMenuBackground: "#6988f8",
        megaMenuText: "#fff",
        tabelEvenBackground: "#F3F4F6",
        cardBackground: "#78ff78",
        cardText: "#000000",
        cardStarting: "#4368ef",
        cardEnding: "#8800ff",
        cardLink: "#107eb58f"
    }
}

const darkTheme: Theme = {
    colors: {
        text: "#fff",
        background: "#27272A",
        navigationBar: "#524cff",
        navigationBarText: "#fff",
        megaMenuBackground: "#6988f8",
        megaMenuText: "#fff",
        tabelEvenBackground: "#1F2937",
        cardBackground: "#0b65a5",
        cardText: "#FFFFFF",
        cardStarting: "#43e4ef",
        cardEnding: "#00b0ff",
        cardLink: "#b5109a8f"
    }
}

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
    const router = useRouter()
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [giscusRefresh, setGiscusRefresh] = useState(false)
    const theme = isDarkMode ? darkTheme : lightTheme

    useEffect(() => {
        const localStorageTheme = localStorage.getItem("prodigy-wiki-dark-mode")
        setIsDarkMode(localStorageTheme === "true")
    }, [])

    useEffect(() => {
        void (async () => {
            // @ts-expect-error
            window.Tablesort = (await import("tablesort")).default
            // @ts-expect-error
            await import("tablesort/src/sorts/tablesort.number")
            // @ts-expect-error
            document.querySelectorAll("table").forEach(table => window.Tablesort(table))
        })()
        setGiscusRefresh(giscusRefresh => !giscusRefresh)
    }, [router.asPath])

    useEffect(() => {
        localStorage.setItem("prodigy-wiki-dark-mode", isDarkMode.toString())
    }, [isDarkMode])

    return (
        <ThemeProvider theme={theme}>
            <Head>
                <link rel="canonical" href={`${siteRoot}${router.asPath}`} />
                <meta name="propeller" content="7b0be454146a11d7dde6dca0284db163" />
                <script dangerouslySetInnerHTML={{
                    __html: "(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('loajawun.com',5407228,document.createElement('script'))"
                }} />
            </Head>
            <Global styles={css`
                body {
                    margin: 0;
                    font-family:
                        system-ui,
                        -apple-system,
                        "Segoe UI",
                        Roboto,
                        Helvetica,
                        Arial,
                        sans-serif,
                        "Apple Color Emoji",
                        "Segoe UI Emoji";
                    background-color: ${theme.colors.background};
                    color: ${theme.colors.text};
                }
                a {
                    text-decoration: none;
                    color: inherit;
                }

                th[role=columnheader]:not(.no-sort) {
                    cursor: pointer;
                }

                th[role=columnheader]:not(.no-sort):after {
                    content: '';
                    float: right;
                    margin-top: 7px;
                    border-width: 0 4px 4px;
                    border-style: solid;
                    border-color: #404040 transparent;
                    visibility: hidden;
                    opacity: 0;
                    -ms-user-select: none;
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    user-select: none;
                }

                th[aria-sort=ascending]:not(.no-sort):after {
                    border-bottom: none;
                    border-width: 4px 4px 0;
                }

                th[aria-sort]:not(.no-sort):after {
                    visibility: visible;
                    opacity: 0.4;
                }

                th[role=columnheader]:not(.no-sort):hover:after {
                    visibility: visible;
                    opacity: 1;
                }
            `} />
            <NavigationBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
            <article css={css`
                margin: 0 0.8rem 1.2rem;
            `}>
                <Component {...pageProps} />
                <GoogleAdsenseAd adSlot="1878857878" adFormat="auto"/>
                <Giscus
                    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                    key={`giscus-${giscusRefresh}`}
                    repo="ProdigyAPI/prodigy-wiki"
                    repoId="R_kgDOH6Qzkg"
                    category="General"
                    categoryId="DIC_kwDOH6Qzks4CRj2G"
                    mapping="title"
                    strict="1"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    inputPosition="top"
                    theme={isDarkMode ? "dark" : "light"}
                    lang="en"
                    loading="lazy"
                />
            </article>
        </ThemeProvider>
    )
}

export default App
