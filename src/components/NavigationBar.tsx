import type { NextComponentType, NextPageContext } from "next"
import Link from "next/link"
import { css, useTheme } from "@emotion/react"
import React from "react"
import GradientTextAnimation from "./GradientTextAnimation"
import LinkText from "./LinkText"
import { names, namesToIds } from "../data"
import { MdBrightness4, MdBrightness7 } from "react-icons/md"

interface Props {
    isDarkMode: boolean
    setIsDarkMode: (isDarkMode: boolean) => void
}

const NavigationBar: NextComponentType<NextPageContext, {}, Props> = ({ isDarkMode, setIsDarkMode }) => {
    const theme = useTheme()
    const DarkModeTag = isDarkMode ? MdBrightness4 : MdBrightness7

    return (
        <nav css={css`
            display: flex;
            flex-direction: column;
            padding: 1.5rem;
            background-color: ${theme.colors.navigationBar};
            color: ${theme.colors.navigationBarText};
            @media (min-width: 768px) {
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
            }
        `}>
            <div css={css`
                display: flex;
                justify-content: center;
                flex-shrink: 0;
            `}>
                <Link href="/" passHref>
                    <LinkText>
                        <GradientTextAnimation startingColor="white" endingColor="#c5b1b1" animationDuration={1} css={{
                            fontSize: "1.25rem",
                            lineHeight: "1.75rem"
                        }}>Prodigy Wiki</GradientTextAnimation>
                    </LinkText>
                </Link>
            </div>
            <div css={css`
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin-top: 0.75rem;
                @media (min-width: 768px) {
                    margin-top: 0;
                }
            `}>
                <div css={css`
                    &:hover .mega-menu {
                        max-height: 100%;
                        padding: 1rem;
                        * {
                            visibility: visible;
                        }
                    }
                `}>
                    <a href="#" css={css`
                        display: inline-block;
                        padding-left: 1.5rem;
                        padding-right: 1.5rem;
                        padding-bottom: 0.5rem;
                        padding-top: 0.5rem;
                        border-radius: 0.5rem;
                        background-color: ${theme.colors.megaMenuBackground};
                        &:hover {
                            filter: brightness(85%);
                        }
                    `}>
                        Items
                    </a>
                    <div className="mega-menu" css={css`
                        display: grid;
                        left: 5%;
                        position: absolute;
                        width: 80%;
                        background-color: ${theme.colors.megaMenuBackground};
                        color: ${theme.colors.megaMenuText};
                        border-radius: 1rem;
                        padding: 0;
                        @media (min-width: 768px) {
                            left: 10%;
                            grid-template-columns: repeat(2, minmax(0, 1fr));
                        }
                        @media (min-width: 1024px) {
                            grid-template-columns: repeat(4, minmax(0, 1fr));
                        }
                        max-height: 0;
                        transition: all .5s ease-in-out;
                        * {
                            visibility: hidden;
                        }
                        &:hover {
                            max-height: 100%;
                            padding: 1rem;
                            * {
                                visibility: visible;
                            }
                        }
                    `}>
                        {names.map(name => (
                            <Link href={`/item/${namesToIds.get(name) ?? "404"}`} passHref key={name}>
                                <LinkText linkColor="#22ff0058" backgroundSize={3}>
                                    {name}
                                </LinkText>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div css={css`
                display: flex;
                flex-direction: row;
                justify-content: center;
                margin-top: 0.75rem;
                @media (min-width: 768px) {
                    margin-top: 0;
                }
            `}>
                <button css={css`
                    background-color: transparent;
                    border: none;
                `} onClick={() => {
                    setIsDarkMode(!isDarkMode)
                }}>
                    <DarkModeTag css={css`
                        color: ${theme.colors.navigationBarText};
                        font-size: 1.5rem;  
                        margin-right: 0.5rem;
                    `} />
                </button>
            </div>
        </nav>
    )
}

export default NavigationBar
