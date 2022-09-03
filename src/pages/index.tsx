import React from "react"
import type { GetStaticProps, NextPage } from "next"
import { css, useTheme } from "@emotion/react"
import GradientTextAnimation from "../components/GradientTextAnimation"
import Header from "../components/Header"
import Head from "next/head"
import _ from "lodash"
import { ItemDataType, ItemDataTypeArray, itemsIds } from "../data"
import { getCachedGameData } from "../gameDataHandler"
import { GameData, GameDataItem } from "prodigy-api/lib/GameData"
import ItemCard from "../components/ItemCard"

interface Props {
    cards: ItemDataTypeArray
    recentItems: ItemDataTypeArray
    cardsAssetUrl: string[]
    recentItemsAssetUrl: string[]
}

const Index: NextPage<Props> = ({ cards, recentItems, cardsAssetUrl, recentItemsAssetUrl }) => {
    const theme = useTheme()

    return (
        <div>
            <Head>
                <title>Prodigy Wiki</title>
                <meta name="og:title" content="Prodigy Wiki" />
                <meta name="description" content="A bunch of information about the math game Prodigy." />
                <meta name="og:description" content="A bunch of information about the math game Prodigy." />
                <meta name="og:image" content="/prodigy-wiki-icon.png" />
            </Head>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>Prodigy Wiki</GradientTextAnimation>
            </Header>
            <Header css={css`
                font-size: 2rem;
            `}>
                Navigation
            </Header>
            <div css={css`
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.5rem;
                    margin: 0.5rem;
                `}>
                {cards.map((card, index) => (
                    <ItemCard itemData={card} key={`${card.type}-${card.ID}`} replaceNameWithType={true} assetUrl={cardsAssetUrl[index]} />
                ))}
            </div>
            <Header css={css`
                font-size: 2rem;
            `}>
                Recently Added Items
            </Header>
            <div css={css`
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.5rem;
                    margin: 0.5rem;
                `}>
                {recentItems.map((card, index) => (
                    <ItemCard itemData={card} key={`${card.type}-${card.ID}`} showCreationDate={true} assetUrl={recentItemsAssetUrl[index]} />
                ))}
            </div>
        </div>
    )
}

export default Index

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getCachedGameData()
    const cards = _.map(itemsIds, id => {
        return _.sample(gameData[id as keyof GameData]) as ItemDataType
    })
    const recentItems = _.sortBy(_.map(itemsIds, id => {
        return gameData[id as keyof GameData]
    }).flat(), e => e.createDate).reverse().slice(0, 10)

    const cardsAssetUrl = _.map(cards, card => {
        let itemDataForAsset = card
        if (card.type === "item") {
            const transform = (card as GameDataItem).data.effect?.transform
            if (transform !== undefined) {
                // @ts-expect-error
                itemDataForAsset = gameData[transform].find((e: ItemDataType) => e.ID === (card as GameDataItem).data.effect?.ID) as ItemDataType
            }
        }

        return `https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${itemDataForAsset.type}-${itemDataForAsset.ID}/${itemDataForAsset.metadata.vIcon ?? 0}/icon-${itemDataForAsset.type}-${itemDataForAsset.ID}.png`
    })
    const recentItemsAssetUrl = _.map(recentItems, card => {
        let itemDataForAsset: ItemDataType = card as ItemDataType
        if (card.type === "item") {
            const transform = (card as GameDataItem).data.effect?.transform
            if (transform !== undefined) {
                // @ts-expect-error
                itemDataForAsset = gameData[transform].find((e: ItemDataType) => e.ID === (card as GameDataItem).data.effect?.ID) as ItemDataType
            }
        }

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        return `https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${itemDataForAsset.type}-${itemDataForAsset.ID}/${itemDataForAsset.metadata?.vIcon ?? 0}/icon-${itemDataForAsset.type}-${itemDataForAsset.ID}.png`
    })

    return {
        props: {
            cards,
            recentItems,
            cardsAssetUrl,
            recentItemsAssetUrl
        },
        revalidate: 60
    }
}
