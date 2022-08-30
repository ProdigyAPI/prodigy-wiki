import React from "react"
import type { NextPage } from "next"
import { css, useTheme } from "@emotion/react"
import GradientTextAnimation from "../components/GradientTextAnimation"

const Index: NextPage = () => {
    const theme = useTheme()

    return (
        <div>
            <h1 css={css`
                text-align: center;
                font-size: 4rem;
                margin: 0;
            `}>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>Prodigy Wiki</GradientTextAnimation>
            </h1>
        </div>
    )
}

export default Index
