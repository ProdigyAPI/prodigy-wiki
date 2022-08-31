import React from "react"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { ids, idsToNames } from "../../data"
import { getGameData } from "prodigy-api"
import { GameData } from "prodigy-api/lib/GameData"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import GradientTextAnimation from "../../components/GradientTextAnimation"
import { css, useTheme } from "@emotion/react"
import Head from "next/head"

interface Props {
    itemData: GameData["boots"] & GameData["follow"] & GameData["fossil"] & GameData["hat"] & GameData["item"] & GameData["key"] & GameData["mathTownFrame"] & GameData["mathTownInterior"] & GameData["mount"] & GameData["outfit"] & GameData["spellRelic"] & GameData["weapon"] & GameData["currency"]
}

const ItemPage: NextPage<Props> = ({ itemData }) => {
    const router = useRouter()
    const theme = useTheme()
    const itemId = router.query.item as string
    const itemName = idsToNames.get(itemId)

    return (
        <div>
            <Head>
                <title>{itemName} - Prodigy Wiki</title>
            </Head>
            <Header>
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text} animationDuration={2}>{itemName}</GradientTextAnimation>
            </Header>
            <p css={css`
                text-align: center;
            `}>
                Currently, prodigy has {itemData.length} {itemName}.
                <GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text} animationDuration={2} css={css`
                    margin-left: 1rem;
                    font-size: inherit;
                    vertical-align: baseline;
                `}>
                    These fossils are:
                </GradientTextAnimation>
            </p>
            <table css={css`
                width: 90%;
                left: 5%;
                position: relative;
                border-collapse: collapse;
                text-align: center;
                margin-bottom: 1rem;
            `}>
                <thead css={css`
                    border: 1px solid #e5e7eb;
                `}>
                    <tr>
                        <th><GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text} animationDuration={2}>ID</GradientTextAnimation></th>
                        <th><GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text} animationDuration={2}>Name</GradientTextAnimation></th>
                        <th><GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text} animationDuration={2}>Description</GradientTextAnimation></th>
                    </tr>
                </thead>
                <tbody>
                    {itemData.map(item => (
                        <tr key={item.ID} css={css`
                            border-bottom: 1px solid #e5e7eb;
                            border-left: 1px solid #e5e7eb;
                            border-right: 1px solid #e5e7eb;
                            &:nth-child(odd) {
                                background-color: ${theme.colors.tabelEvenBackground};
                            }
                        `}>
                            <td css={css`
                                padding-left: 1.5rem;
                                padding-right: 1.5rem;
                                padding-top: 1rem;
                                padding-bottom: 1rem;
                            `}>{item.ID}</td>
                            <td>{item.name}</td>
                            <td>{item.data.flavorText}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ItemPage

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getGameData()

    return {
        props: {
            itemData: gameData[context.params?.item as keyof GameData] as GameData["boots"] & GameData["follow"] & GameData["fossil"] & GameData["hat"] & GameData["item"] & GameData["key"] & GameData["mathTownFrame"] & GameData["mathTownInterior"] & GameData["mount"] & GameData["outfit"] & GameData["spellRelic"] & GameData["weapon"] & GameData["currency"]
        },
        revalidate: 60
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: ids.map(id => ({ params: { item: id } })),
        fallback: "blocking"
    }
}
