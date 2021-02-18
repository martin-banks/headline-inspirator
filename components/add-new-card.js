import React from 'react'
import Styled from 'styled-components'

const Wrapper = Styled.button`
  display: grid;
  justify-content: center;
  align-items: center;
`

function AddNewCard () {
  return <Wrapper>
    <h4>Add new card</h4>
  </Wrapper>
}

export default AddNewCard