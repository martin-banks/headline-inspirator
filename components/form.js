import React from 'react'
import Styled from 'styled-components'

const Form = Styled.form`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`

function SearchForm (props) {
  const { children } = props
  return <Form>
    { children }
  </Form>
}

export default SearchForm
