import React from "react"
import type { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { ids, idsToNames, ItemDataTypeArray } from "../../data"
import { getCachedGameData } from "../../gameDataHandler"
import { GameData } from "prodigy-api/lib/GameData"
import { useRouter } from "next/router"
import Header from "../../components/Header"
import GradientTextAnimation from "../../components/GradientTextAnimation"
import { css, useTheme } from "@emotion/react"
import Head from "next/head"
import Link from "next/link"
import LinkText from "../../components/LinkText"

interface Props {
    itemData: ItemDataTypeArray
}

const ItemPage: NextPage<Props> = ({ itemData }) => {
    const router = useRouter()
    const theme = useTheme()
    const itemId = router.query.category as string
    const itemName = idsToNames.get(itemId)

    return (
        <div>
            <Head>
                <title>{itemName} - Prodigy Wiki</title>
                <meta name="og:title" content={`${itemName as string} - Prodigy Wiki`} />
                <meta name="description" content={`A bunch of information about ${itemName as string} in the math game Prodigy.`} />
                <meta name="og:description" content={`A bunch of information about ${itemName as string} in the math game Prodigy.`} />
                <meta name="og:image" content="/prodigy-wiki-icon.png" />
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
                    These {itemName?.toLowerCase()} are:
                </GradientTextAnimation>
            </p>
            <div css={css`
                overflow-x: auto;
            `}>
                <table css={css`
                    width: 100%;
                    @media (min-width: 768px) {
                        width: 90%;
                        left: 5%;
                    }
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
                            {itemData.filter(item => Object.prototype.hasOwnProperty.call(item.data, "price")).length > 0 && <th><GradientTextAnimation startingColor="#008080" endingColor={theme.colors.text} animationDuration={2}>Price</GradientTextAnimation></th>}
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
                                <td>
                                    <Link href={`/item/${itemId}/${item.ID}`} passHref>
                                        <LinkText>
                                            {item.data.name}
                                        </LinkText>
                                    </Link>
                                </td>
                                { /* @ts-expect-error */ }
                                <td>{Object.prototype.hasOwnProperty.call(item.data, "flavorText") ? item.data.flavorText : item.data.description}</td>
                                { /* @ts-expect-error */ }
                                {item.data.price !== undefined && <td>{item.data.price}</td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ItemPage

export const getStaticProps: GetStaticProps = async context => {
    const gameData = await getCachedGameData()

    return {
        props: {
            itemData: gameData[context.params?.category as keyof GameData] as ItemDataTypeArray
        },
        revalidate: 600
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: ids.map(id => ({ params: { category: id } })),
        fallback: "blocking"
    }
}
