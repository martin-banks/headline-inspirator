import React from 'react'
import Styled, { keyframes } from 'styled-components'


const Svg = Styled.svg`
  position: relative;
  overflow: visible;
  margin-bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
`

const animateLongLine = keyframes`
  to {
    stroke-dashoffset: 1200
  }
`
const animateShortLine = keyframes`
  to {
    stroke-dashoffset: -1200
  }
`

const Circle = Styled.circle`
  stroke: white;
  stroke-width: 12px;
  fill: none;
  stroke-dasharray: 52;
  animation: ${animateLongLine} 20s infinite linear;
`

const InnerCircle = Styled.circle`
  stroke: white;
  stroke-width: 10px;
  fill: none;
  stroke-dasharray: 48;
  animation: ${animateShortLine} 25s infinite linear;
`


function Spinner () {
  return <Svg viewBox="0 0 100 100" width="80px">
    <Circle cx="50" cy="50" r="50" />
    <InnerCircle cx="50" cy="50" r="30" />
  </Svg>
}

export default Spinner
