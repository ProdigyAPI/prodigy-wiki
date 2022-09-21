import React from "react"
import { css, useTheme } from "@emotion/react"
import type { GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { getCachedGameData } from "../gameDataHandler"
import { GameDataPet } from "prodigy-api/lib/GameData"
import ItemCard from "../components/ItemCard"
import Header from "../components/Header"
import GradientTextAnimation from "../components/GradientTextAnimation"

interface Props {
    pets: GameDataPet[]
}

const Pets: NextPage<Props> = ({ pets }) => {
    const theme = useTheme()

    return (
        <>
            <Head>
                <title>Pets - Prodigy Wiki</title>
                <meta name="og:title" content="Pets - Prodigy Wiki" />
                <meta name="description" content="A bunch of information about the pets in the math game Prodigy." />
                <meta name="og:description" content="A bunch of information about the pets in the math game Prodigy." />
                <meta name="og:image" content="/prodigy-wiki-icon.png" />
                <meta name="og:image:alt" content="Prodigy Wiki icon" />
                <meta name="keywords" content="Prodigy, Prodigy Wiki, Prodigy-Wiki, prodigy, math game, prodigy math game, prodigy pets" />
            </Head>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>Pets</GradientTextAnimation>
            </Header>
            <div css={css`
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.5rem;
                    margin: 0.5rem;
                `}>
                {pets.map((card, index) => (
                    <ItemCard itemData={card} key={`${card.type}-${card.ID}`} customUrl={`/pet/${card.ID}`} showCreationDate={true} />
                ))}
            </div>
        </>
    )
}

export default Pets

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getCachedGameData()

    return {
        props: {
            pets: gameData.pet
        },
        revalidate: 600
    }
}
