import React, { useState } from 'react'
import Styled from 'styled-components'

import queries from '../queries'


const CardWrapper = Styled.div`
  outline: solid 1px lightgrey; 
  display: grid;
`
const Ul = Styled.ul`
  padding: 0;
`
const Li = Styled.li`
  text-transform: capitalize;
  padding: 4px 8px;
  list-style: none;
  cursor: pointer;
  &:hover {
    background: rgba(0,0,0, 0.1)
  }
`

const Front = Styled.div`
  background: white;
  padding: 10px;
`
const Back = Styled.div`
  background: grey;
  padding: 10px;
`


function Card (props) {
  const {
    type,
    title,
    handleResultClick,
    results,
  } = props

  const [ flipped, setFlipped ] = useState(false)

  const showFront = () => {
    setFlipped(() => false)
  }
  const showBack = () => {
    setFlipped(() => true)
  }
  const handleSelectQuery = e => {
    console.log(e.target.value)
  }

  return (
    <CardWrapper>
      { !flipped &&
        <Front>
          <button onClick={ showBack } >Flip</button>
          <h3>{ title }</h3>
          <Ul>
            { results[type].length
              ? results[type].map((r, i) => <Li key={ `result-item-${type}-${i}` } onClick={ handleResultClick }>{ r.word }</Li>)
              : <p><i>No matches found</i></p>
            }
          </Ul>
        </Front>
      }

      { flipped &&
        <Back>
          <button onClick={ showFront } >Flip</button>
          <h3>Card settings</h3>

          <h4>Choose search query</h4>
          <select onChange={ handleSelectQuery }>
            { queries
              .map(group => group.queries
                .map((q, i) => <option key={`option-${q.name}-${i}`} value={ i }>{ q.name }</option>)
              )
            }
          </select>


        </Back>
      }
    </CardWrapper>
  )
}


export default Card
