import React from 'react'
import Styled from 'styled-components'

import Spinner from './spinner'


const Wrapper = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255, 0.4);
  backdrop-filter: blur(3px);
  display: grid;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const Message = Styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 20px 20px;
  background: rgba(0,0,0, 0.5);
  border-radius: 4px;
  * {
    color: white;
    margin: 0;
    padding: 0;
  }
`


function Loading () {

  return <Wrapper>
    <Message>
      <Spinner />
      <h4>Fetching data...</h4>
    </Message>
  </Wrapper>
}

export default Loading
