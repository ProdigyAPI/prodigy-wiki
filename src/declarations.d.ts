import "@emotion/react"

declare module "@emotion/react" {
    export interface Theme {
        colors: {
            text: string
            background: string
            navigationBar: string
            navigationBarText: string
            megaMenuBackground: string
            megaMenuText: string
            tabelEvenBackground: string
            cardBackground: string
            cardText: string
            cardStarting: string
            cardEnding: string
        }
    }
}
