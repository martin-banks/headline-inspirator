import React from 'react'
import Styled from 'styled-components'

const Input = Styled.input`
  display: block;
  width: 100%;
  margin-bottom: 30px;
  padding: 10px 20px;
  font-size: 24px;
  text-align: center;
`

function InputText (props) {
  return <Input type="text" />

}

export default InputText
