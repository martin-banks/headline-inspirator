import React from 'react'
import Styled from 'styled-components'


const CardWrapper = Styled.div`
  outline: solid 1px lightgrey;
  padding: 10px;
`

const Li = Styled.li`
  text-transform: capitalize;
`


function Card (props) {
  const {
    type,
    title,
    handleResultClick,
    results,
  } = props

  return (
    <CardWrapper>
      <h3>{ title }</h3>
      <ul>
        { results[type].length
          ? results[type].map((r, i) => <Li key={ `result-item-${type}-${i}` } onClick={ handleResultClick }>{ r.word }</Li>)
          : <p><i>No matches found</i></p>
        }
      </ul>
    </CardWrapper>
  )
}


export default Card
