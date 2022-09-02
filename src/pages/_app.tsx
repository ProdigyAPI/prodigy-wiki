import React, { useEffect, useState } from "react"
import type { AppProps } from "next/app"
import { Global, css, ThemeProvider, Theme } from "@emotion/react"
import NavigationBar from "../components/NavigationBar"

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
    const [isDarkMode, setIsDarkMode] = useState(false)
    const theme = isDarkMode ? darkTheme : lightTheme

    useEffect(() => {
        const localStorageTheme = localStorage.getItem("prodigy-wiki-dark-mode")
        setIsDarkMode(localStorageTheme === "true")
        void (async () => {
            // @ts-expect-error
            window.Tablesort = (await import("tablesort")).default
            // @ts-expect-error
            await import("tablesort/src/sorts/tablesort.number")
            // @ts-expect-error
            document.querySelectorAll("table").forEach(table => window.Tablesort(table))
        })()
    }, [])

    useEffect(() => {
        localStorage.setItem("prodigy-wiki-dark-mode", isDarkMode.toString())
    }, [isDarkMode])

    return (
        <ThemeProvider theme={theme}>
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
            <Component {...pageProps} />
        </ThemeProvider>
    )
}

export default App
