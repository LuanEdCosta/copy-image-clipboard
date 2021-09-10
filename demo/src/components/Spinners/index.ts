import styled, { keyframes, css } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export interface SpinnerProps {
  duration?: number
  color?: string
  ringColor?: string
  background?: string
  size?: string
  thickness?: number
}

export const Spinner = styled.div<SpinnerProps>`
  ${(props) => {
    const {
      duration = 0.5,
      color = props.theme.primaryText,
      ringColor = 'rgba(0,0,0,0.1)',
      background = 'transparent',
      size = '1em',
      thickness = 2,
    } = props
    return css`
      animation: ${rotate360} ${duration}s linear infinite;
      transform: translateZ(0);
      border-top: ${thickness}px solid ${ringColor};
      border-right: ${thickness}px solid ${ringColor};
      border-bottom: ${thickness}px solid ${ringColor};
      border-left: ${thickness}px solid ${color};
      background: ${background};
      width: ${size};
      height: ${size};
      border-radius: 50%;
    `
  }}
`

export const WhiteSpinner = styled(Spinner).attrs({
  color: 'white',
  ringColor: 'rgba(255, 255, 255, 0.1)',
})``
