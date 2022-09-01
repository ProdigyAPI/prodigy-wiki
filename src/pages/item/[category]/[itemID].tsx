import React from "react"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { dateToText, ids, ItemDataType } from "../../../data"
import { getCachedGameData } from "../../../gameDataHandler"
import { GameData, GameDataItem } from "prodigy-api/lib/GameData"
import Header from "../../../components/Header"
import GradientTextAnimation from "../../../components/GradientTextAnimation"
import { css, useTheme } from "@emotion/react"
import Image from "next/image"
import _ from "lodash"

interface Props {
    itemData: ItemDataType
    assetUrl: string
}

const ItemDataPage: NextPage<Props> = ({ itemData, assetUrl }) => {
    const theme = useTheme()

    const centerText = css`
        text-align: center;   
        margin-left: 1rem;
        margin-right: 1rem;             
    `

    return (
        <div>
            <Head>
                <title>{itemData.data.name} - Prodigy Wiki</title>
            </Head>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>{itemData.data.name}</GradientTextAnimation>
            </Header>
            <div css={centerText}>
                <Image src={assetUrl} alt={itemData.data.name} width={160} height={160} />
            </div>
            <p css={centerText}>
                { /* @ts-expect-error */ }
                {Object.prototype.hasOwnProperty.call(itemData.data, "flavorText") ? itemData.data.flavorText : itemData.data.description}
                {" "} This item was created on {dateToText(itemData.createDate)}.
                {Object.prototype.hasOwnProperty.call(itemData.data, "member") && <>
                    { /* @ts-expect-error */ }
                    {" "} The {itemData.data.name} is {itemData.data.member === 0 ? "not" : ""} member only.
                </>}
            </p>
        </div>
    )
}

export default ItemDataPage

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getCachedGameData()
    // @ts-expect-error
    const itemData = gameData[context.params?.category as keyof GameData].find((e: ItemDataType) => e.ID === parseInt(context.params?.itemID?.toString() ?? "")) as ItemDataType

    let itemDataForAsset = itemData
    if (itemData.type === "item") {
        const transform = (itemData as GameDataItem).data.effect?.transform
        if (transform !== undefined) {
            // @ts-expect-error
            itemDataForAsset = gameData[transform].find((e: ItemDataType) => e.ID === (itemData as GameDataItem).data.effect?.ID) as ItemDataType
        }
    }

    const assetUrl = `https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${itemDataForAsset.type}-${itemDataForAsset.ID}/${itemDataForAsset.metadata.vIcon ?? 0}/icon-${itemDataForAsset.type}-${itemDataForAsset.ID}.png`

    return {
        props: {
            itemData,
            assetUrl
        },
        revalidate: 6000
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const gameData = await getCachedGameData()

    return {
        paths: _.flatten(ids.map(id => {
            return gameData[id as keyof GameData].map(item => {
                return {
                    params: {
                        category: id,
                        itemID: item.ID?.toString() ?? ""
                    }
                }
            })
        })),
        fallback: "blocking"
    }
}
