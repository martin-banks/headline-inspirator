import React from 'react'
import Styled, { keyframes } from 'styled-components'


const Svg = Styled.svg`
  position: relative;
  overflow: visible;
  /* margin: 0 auto; */
  margin-bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
`

const animateline = keyframes`
  to {
    stroke-dashoffset: 1200
  }
`

const Circle = Styled.circle`
  stroke: white;
  stroke-width: 15px;
  fill: none;
  stroke-dasharray: 52;
  animation: ${animateline} 15s infinite linear;
`


function Spinner () {
  return <Svg viewBox="0 0 100 100" width="80px">
    <Circle cx="50" cy="50" r="50" />
  </Svg>
}

export default Spinner
