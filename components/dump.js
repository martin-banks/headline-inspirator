import React from 'react'
import Styled from 'styled-components'


const Pre = Styled.pre`
  display: block;
  background: rgba(0,0,0, 0.8);
  color: lime;
  padding: 20px;
`

function Dump ({ children }) {

  return (
    <Pre>
      <code>
        { children }
      </code>
    </Pre>
  )
}


export default Dump
