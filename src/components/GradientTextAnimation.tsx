import styled from "@emotion/styled"
import { keyframes } from "@emotion/react"

export interface Props {
    startingColor: string
    endingColor: string
    animationDuration?: number
}

const Shine = keyframes`
    to {
        background-position: 200% center;
    }
`

const GradientTextAnimation = styled.sub<Props>`
    animation-name: ${Shine};
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-duration: ${props => props.animationDuration ?? 4}s;
    color: transparent;
    background-clip: text;
    background-image: linear-gradient(to right, ${props => props.startingColor}, ${props => props.endingColor});
    background-size: 200% auto;
    line-height: initial;
    font-weight: 800;
`

export default GradientTextAnimation
