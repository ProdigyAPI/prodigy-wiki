import React from "react"
import type { NextComponentType, NextPageContext } from "next"
import { dateToText, idsToNames, ItemDataType } from "../data"
import { css, useTheme } from "@emotion/react"
import Image from "next/image"
import GradientTextAnimation from "./GradientTextAnimation"
import Link from "next/link"
import LinkText from "./LinkText"
import { GameDataPet } from "prodigy-api/lib/GameData"

interface Props {
    itemData: ItemDataType | GameDataPet
    replaceNameWithType?: boolean
    showCreationDate?: boolean
    assetUrl?: string
    customUrl?: string
}

const ItemCard: NextComponentType<NextPageContext, {}, Props> = (
    { itemData, replaceNameWithType = false, showCreationDate = false, assetUrl = "", customUrl = "" }
) => {
    const theme = useTheme()

    return (
        <div css={css`
            padding: 1rem;
            background-color: ${theme.colors.cardBackground};
            color: ${theme.colors.cardText};
            border-radius: 0.5rem;
            text-align: center;
        `}>
            <Link href={customUrl === "" ? `/item/${itemData.type}/${replaceNameWithType ? "" : itemData.ID}` : customUrl} passHref>
                <LinkText linkColor={theme.colors.cardLink} backgroundSize={2}>
                    <GradientTextAnimation css={css`
                        font-size: 1.25rem;
                    `} startingColor={theme.colors.cardStarting} endingColor={theme.colors.cardEnding} animationDuration={1.5}>{replaceNameWithType ? idsToNames.get(itemData.type) : itemData.data.name}</GradientTextAnimation>
                </LinkText>
            </Link>
            {showCreationDate && (
                <div css={css`
                    font-size: 0.75rem;
                    margin-top: 0.5rem;
                `}>
                    Created on {dateToText(itemData.createDate)}
                </div>
            )}
            <br />
            { /* eslint-disable-next-line @typescript-eslint/strict-boolean-expressions */ }
            <Image src={assetUrl || `https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${itemData.type}-${itemData.ID}/${itemData.metadata.vIcon ?? 0}/icon-${itemData.type}-${itemData.ID}.png`} alt={itemData.data.name} width={80} height={80} />
        </div>
    )
}

export default ItemCard
