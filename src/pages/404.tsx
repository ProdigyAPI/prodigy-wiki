import React from "react"
import type { NextPage } from "next"
import Header from "../components/Header"
import GradientTextAnimation from "../components/GradientTextAnimation"
import { useTheme } from "@emotion/react"

const Page404: NextPage = () => {
    const theme = useTheme()

    return (
        <>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>404 Page Not Found</GradientTextAnimation>
            </Header>
        </>
    )
}

export default Page404
