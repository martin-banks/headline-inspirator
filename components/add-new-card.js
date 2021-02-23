import React from 'react'
import Styled from 'styled-components'

const Wrapper = Styled.button`
  display: grid;
  justify-content: center;
  align-items: center;
  background: none;
  border: dashed 2px rgba(0,0,0, 0.1);
  border-radius: 16px;
  cursor: pointer;
  transform: scale(0.98);
  &:hover {
    background: rgba(0,0,0, 0.1);
  }
`


function AddNewCard (props) {
  const { addCard } = props
  return <Wrapper onClick={ addCard }>
    <h4>Add new card</h4>
  </Wrapper>
}

export default AddNewCard
