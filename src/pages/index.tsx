import React from "react"
import type { GetStaticProps, NextPage } from "next"
import { css, useTheme } from "@emotion/react"
import GradientTextAnimation from "../components/GradientTextAnimation"
import Header from "../components/Header"
import Head from "next/head"
import { getGameData } from "prodigy-api"
import _ from "lodash"
import { ItemDataType, itemsIds } from "../data"
import { GameData } from "prodigy-api/lib/GameData"
import ItemCard from "../components/ItemCard"

interface Props {
    cards: ItemDataType[]
}

const Index: NextPage<Props> = ({ cards }) => {
    const theme = useTheme()

    return (
        <div>
            <Head>
                <title>Prodigy Wiki</title>
            </Head>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>Prodigy Wiki</GradientTextAnimation>
            </Header>
            <div css={css`
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.5rem;
                    margin-top: 0.5rem;
                    margin-left: 0.5rem;
                    margin-right: 0.5rem;
                `}>
                {cards.map(card => (
                    <ItemCard itemData={card} key={card.ID} />
                ))}
            </div>
        </div>
    )
}

export default Index

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getGameData()

    return {
        props: {
            cards: _.map(itemsIds, id => {
                return _.sample(gameData[id as keyof GameData]) as ItemDataType
            })
        },
        revalidate: 60
    }
}
