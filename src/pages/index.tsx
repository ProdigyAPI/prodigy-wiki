import React from "react"
import type { GetStaticProps, NextPage } from "next"
import { css, useTheme } from "@emotion/react"
import GradientTextAnimation from "../components/GradientTextAnimation"
import Header from "../components/Header"
import Head from "next/head"
import _ from "lodash"
import { ItemDataType, itemsIds } from "../data"
import { getCachedGameData } from "../gameDataHandler"
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
            <div dangerouslySetInnerHTML={{
                __html: `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8981394123170949"
                crossorigin="anonymous"></script>
           <!-- Home Page Ads -->
           <ins class="adsbygoogle"
                style="display:block"
                data-ad-client="ca-pub-8981394123170949"
                data-ad-slot="9471523421"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
           <script>
                (adsbygoogle = window.adsbygoogle || []).push({});
           </script>`
            }}/>
            <Header css={css`
                font-size: 2rem;
            `}>
                Items
            </Header>
            <div css={css`
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.5rem;
                    margin: 0.5rem;
                `}>
                {cards.map(card => (
                    <ItemCard itemData={card} key={`${card.type}-${card.ID}`} replaceNameWithType={true} />
                ))}
            </div>
        </div>
    )
}

export default Index

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getCachedGameData()

    return {
        props: {
            cards: _.map(itemsIds, id => {
                return _.sample(gameData[id as keyof GameData]) as ItemDataType
            })
        },
        revalidate: 60
    }
}
