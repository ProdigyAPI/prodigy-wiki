import styled from "@emotion/styled"

interface Props {
    linkColor?: string
    backgroundSize?: number
}

const LinkText = styled.a<Props>`
    background: linear-gradient(${props => props.linkColor ?? "rgba(16,125,181,.15)"}, ${props => props.linkColor ?? "rgba(16,125,181,.15)"});
    background-size: 100% ${props => props.backgroundSize ?? 4}px;
    background-position: 100% 100%;
    background-repeat: no-repeat;
    transition: background-size .25s ease-out, box-shadow .25s ease-out 0s;
    &:hover {
        background-size: 100% 100%;
        transition: background-size .25s ease-out 0s;
    }
`

export default LinkText
