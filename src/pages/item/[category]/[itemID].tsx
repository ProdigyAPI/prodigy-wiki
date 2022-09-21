import React from "react"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { dateToText, ids, ItemDataType, Rarity } from "../../../data"
import { getCachedGameData } from "../../../gameDataHandler"
import { GameData, GameDataItem, AffixElement } from "prodigy-api/lib/GameData"
import Header from "../../../components/Header"
import GradientTextAnimation from "../../../components/GradientTextAnimation"
import { css, useTheme } from "@emotion/react"
import Image from "next/image"
import _ from "lodash"
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs"
import Link from "next/link"

interface Props {
    itemData: ItemDataType
    assetUrl: string
    effects: AffixElement[]
    nextID: number
    prevID: number
}

const ItemDataPage: NextPage<Props> = ({ itemData, assetUrl, effects, nextID, prevID }) => {
    const theme = useTheme()

    const centerText = css`
        text-align: center;
        margin-left: 1rem;
        margin-right: 1rem;
    `

    const headerTwo = css`
        ${centerText}
        font-size: 2rem;
        margin: 0;
    `

    const arrowIcon = css`
        font-size: 4rem;
        color: #008080;
    `

    return (
        <div>
            <Head>
                <title>{itemData.data.name} - Prodigy Wiki</title>
                <meta name="og:title" content={`${itemData.data.name} - Prodigy Wiki`} />
                <meta name="description" content={`A bunch of information about the item ${itemData.data.name} in the math game Prodigy.`} />
                <meta name="og:description" content={`A bunch of information about the item ${itemData.data.name} in the math game Prodigy.`} />
                <meta name="og:image" content={assetUrl} />
                <meta name="og:image:alt" content={`${itemData.data.name} icon`} />
                <meta name="og:type" content="article" />
                <meta name="keywords" content={`${itemData.data.name}, ${itemData.type} ${itemData.data.name}, ${itemData.type}, prodigy ${itemData.data.name}, Prodigy, Prodigy Wiki, Prodigy-Wiki, prodigy, math game, prodigy math game`} />
            </Head>
            <div css={css`
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            `}>
                <Link href={`/item/${itemData.type}/${prevID}`} passHref>
                    <a>
                        <BsFillCaretLeftFill css={arrowIcon} />
                    </a>
                </Link>
                <Header>
                    <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>{itemData.data.name}</GradientTextAnimation>
                </Header>
                <Link href={`/item/${itemData.type}/${nextID}`} passHref>
                    <a>
                        <BsFillCaretRightFill css={arrowIcon} />
                    </a>
                </Link>
            </div>
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
                {Object.prototype.hasOwnProperty.call(itemData.data, "rarity") && <>
                    { /* @ts-expect-error */ }
                    {" "} This item is {Rarity[itemData.data.rarity]}.
                </>}
                {Object.prototype.hasOwnProperty.call(itemData.data, "price") && <>
                    { /* @ts-expect-error */ }
                    {" "} This item costs {itemData.data.price} gold.
                </>}
            </p>
            {effects.length > 0 && <>
                <h2 css={headerTwo}>
                    <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text} animationDuration={2} css={css`
                    font-size: inherit;
                `}>Effects</GradientTextAnimation>
                </h2>
                <p css={centerText}>
                This item has the following effects: {effects.map((effect, index) => <>
                        <span css={css`
                        color: ${theme.colors.text};
                    `}>{index > 0 ? "," : ""} {effect.data.name} (Boost of {1 + (effect.data.valuePercent ?? 0)})</span>
                    </>)}
                </p>
            </>}
        </div>
    )
}

export default ItemDataPage

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getCachedGameData()

    const itemCollection = gameData[context.params?.category as keyof GameData]

    // @ts-expect-error
    const itemIndex = itemCollection.findIndex((e: ItemDataType) => e.ID === parseInt(context.params?.itemID?.toString() ?? ""))
    const itemData = itemCollection[itemIndex] as ItemDataType

    let itemDataForAsset = itemData
    if (itemData.type === "item") {
        const transform = (itemData as GameDataItem).data.effect?.transform
        if (transform !== undefined) {
            // @ts-expect-error
            itemDataForAsset = gameData[transform].find((e: ItemDataType) => e.ID === (itemData as GameDataItem).data.effect?.ID) as ItemDataType
        }
    }

    const assetUrl = `https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${itemDataForAsset.type}-${itemDataForAsset.ID}/${itemDataForAsset.metadata.vIcon ?? 0}/icon-${itemDataForAsset.type}-${itemDataForAsset.ID}.png`

    const effects: AffixElement[] = []
    // @ts-expect-error
    if (itemData.data.effects instanceof Array) {
        // @ts-expect-error
        for (let effect of itemData.data.effects) {
            if (effect instanceof Array) {
                effect = effect[0]
            }
            if (typeof effect === "string") {
                effect = parseInt(effect)
            }
            effects.push(gameData.affix.find(e => e.ID === effect) as AffixElement)
        }
    }

    let prevIndex = itemIndex - 1
    let nextIndex = itemIndex + 1

    if (prevIndex < 0) {
        prevIndex = itemCollection.length - 1
    }

    if (nextIndex >= itemCollection.length) {
        nextIndex = 0
    }

    const nextID = (itemCollection[nextIndex] as ItemDataType).ID
    const prevID = (itemCollection[prevIndex] as ItemDataType).ID

    return {
        props: {
            itemData,
            assetUrl,
            effects,
            nextID,
            prevID
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
        fallback: false
    }
}
