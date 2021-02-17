import React from 'react'
import Styled from 'styled-components'


const Wrapper = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(255,255,255, 0.4);
  backdrop-filter: blur(5px);
  z-index: 1000;
  display: grid;
  justify-content: center;
  align-items: center;
`

const Message = Styled.div`
  padding: 10px 20px;
  background: black;
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
      <h4>Requesting data...</h4>
    </Message>
  </Wrapper>
}

export default Loading
