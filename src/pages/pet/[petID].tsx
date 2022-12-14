import React from "react"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { getCachedGameData } from "../../gameDataHandler"
import { GameDataPet, Spell } from "prodigy-api/lib/GameData"
import Head from "next/head"
import Header from "../../components/Header"
import GradientTextAnimation from "../../components/GradientTextAnimation"
import { css, useTheme } from "@emotion/react"
import Image from "next/image"
import { dateToText } from "../../data"
import _ from "lodash"

interface Props {
    pet: GameDataPet
    spells: Spell[]
    spellsNotFound: boolean
}

const PetPage: NextPage<Props> = ({ pet, spells, spellsNotFound }) => {
    const theme = useTheme()

    const centerText = css`
        text-align: center;
        margin-left: 1rem;
        margin-right: 1rem;
    `

    return (
        <>
            <Head>
                <title>{pet.data.name} - Prodigy Wiki</title>
                <meta name="og:title" content={`${pet.data.name} - Prodigy Wiki`} />
                <meta name="description" content={`A bunch of information about the pet ${pet.data.name} in the math game Prodigy.`} />
                <meta name="og:description" content={`A bunch of information about the pet ${pet.data.name} in the math game Prodigy.`} />
                <meta name="og:image" content={`https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${pet.type}-${pet.ID}/${pet.metadata.vIcon ?? 0}/icon-${pet.type}-${pet.ID}.png`} />
                <meta name="og:image:alt" content={`${pet.data.name} icon`} />
                <meta name="og:type" content="article" />
                <meta name="keywords" content={`${pet.data.name}, prodigy ${pet.data.name}, prodigy wiki ${pet.data.name}, prodigy pet ${pet.data.name}, Prodigy, Prodigy Wiki, Prodigy-Wiki, prodigy, math game, prodigy math game, prodigy pets`} />
            </Head>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text}>{pet.data.name}</GradientTextAnimation>
            </Header>
            <div css={centerText}>
                <Image src={`https://cdn.prodigygame.com/game/assets/v1_cache/single-images/icon-${pet.type}-${pet.ID}/${pet.metadata.vIcon ?? 0}/icon-${pet.type}-${pet.ID}.png`} alt={pet.data.name} width={160} height={160} />
            </div>
            <p css={centerText}>
                {pet.data.flavorText}
                {" "} This pet was created on {dateToText(pet.createDate)}.
                This pet&apos;s element is {pet.data.element}.
                {" "} {pet.data.name} is {pet.data.member === 0 ? "not" : ""} member only.
                {spellsNotFound
                    ? " The spells for this pet could not be found."
                    : <>
                    All {pet.data.name} have the {pet.data.nativeSpells.map(e => spells.find(x => x.ID === e.spell)?.data.name).join(" and ")} spell.
                    For the third move it can be one of the following: {pet.data.foreignSpellPools[0].map(e => spells.find(x => x.ID === e)?.data.name).join(", ")}.
                    For the fourth move it can be one of the following: {pet.data.foreignSpellPools[1].map(e => spells.find(x => x.ID === e)?.data.name).join(", ")}.
                        {" "} {pet.data.name} has a health stat of {pet.data.statHealth} and a power stat of {pet.data.statPower}.
                    </>}
            </p>
        </>
    )
}

export default PetPage

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getCachedGameData()
    const petID = parseInt(context.params?.petID?.toString() ?? "0")
    const pet = gameData.pet.find(pet => pet.ID === petID) as GameDataPet
    if (typeof pet === "undefined") {
        return {
            notFound: true
        }
    }
    const spellIdsNeeded = _.concat(pet.data.nativeSpells?.map(e => e.spell) ?? [], _.flatten(pet.data.foreignSpellPools ?? []))

    return {
        props: {
            pet,
            spells: gameData.spell.filter(e => spellIdsNeeded.includes(e.ID)),
            spellsNotFound: typeof pet.data.nativeSpells === "undefined" || typeof pet.data.foreignSpellPools === "undefined"
        },
        revalidate: 6000
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const gameData = await getCachedGameData()

    return {
        paths: gameData.pet.map(pet => ({
            params: {
                petID: pet.ID.toString()
            }
        })),
        fallback: "blocking"
    }
}
