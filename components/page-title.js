import React from 'react'
import Styled from 'styled-components'


const Title = Styled.div`
  text-align: center;
  display: grid;
  justify-content: center;
  align-items: center;
`

function PageTitle (props) {
  const {
    title,
    subhead,
    intro,
    children,
  } = props

  return <Title>
    { title && <h1>{ title }</h1> }
    { subhead && <h2>{ subhead }</h2> }
    { intro && <p>{ intro }</p> }
    { children }
  </Title>
}

export default PageTitle
