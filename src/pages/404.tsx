import React from "react"
import type { NextPage } from "next"
import Header from "../components/Header"
import GradientTextAnimation from "../components/GradientTextAnimation"
import { useTheme } from "@emotion/react"
import Head from "next/head"

const Page404: NextPage = () => {
    const theme = useTheme()

    return (
        <>
            <Head>
                <title>404 - Prodigy Wiki</title>
            </Head>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>404 Page Not Found</GradientTextAnimation>
            </Header>
        </>
    )
}

export default Page404
