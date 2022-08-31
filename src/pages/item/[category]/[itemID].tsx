import React from "react"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import Head from "next/head"
import { ItemDataType } from "../../../data"
import { getGameData } from "prodigy-api"
import { GameData } from "prodigy-api/lib/GameData"
import Header from "../../../components/Header"
import GradientTextAnimation from "../../../components/GradientTextAnimation"
import { css, useTheme } from "@emotion/react"
import { format, utcToZonedTime } from "date-fns-tz"
import Image from "next/image"

interface Props {
    itemData: ItemDataType
}

const ItemDataPage: NextPage<Props> = ({ itemData }) => {
    const theme = useTheme()
    const timeZone = typeof Intl === "undefined" ? "America/New_York" : Intl.DateTimeFormat().resolvedOptions().timeZone
    const creationDate = utcToZonedTime(itemData.createDate, timeZone)

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
                <Image src={`https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${itemData.type}-${itemData.ID}/${itemData.metadata.vIcon ?? 0}/icon-${itemData.type}-${itemData.ID}.png`} alt={itemData.data.name} width={160} height={160} />
            </div>
            <p css={centerText}>
                { /* @ts-expect-error */ }
                {Object.prototype.hasOwnProperty.call(itemData.data, "flavorText") ? itemData.data.flavorText : itemData.data.description}
                {" "} This item was created on {format(creationDate, "EEEE, LLLL d, yyyy 'at' h:m a z", {
                    timeZone
                })}.
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
    const gameData = await getGameData()

    return {
        props: {
            // @ts-expect-error
            itemData: gameData[context.params?.category as keyof GameData].find((e: ItemDataType) => e.ID === parseInt(context.params?.itemID?.toString() ?? "")) as ItemDataType
        },
        revalidate: 6000
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}
