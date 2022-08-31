import React from "react"
import type { NextPage } from "next"
import { useTheme } from "@emotion/react"
import GradientTextAnimation from "../components/GradientTextAnimation"
import Header from "../components/Header"
import Head from "next/head"

const Index: NextPage = () => {
    const theme = useTheme()

    return (
        <div>
            <Head>
                <title>Prodigy Wiki</title>
            </Head>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>Prodigy Wiki</GradientTextAnimation>
            </Header>
        </div>
    )
}

export default Index
