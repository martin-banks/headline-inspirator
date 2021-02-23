import React, { useState } from 'react'
import Styled from 'styled-components'

import queries from '../queries-new.json'


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
    index,
    type,
    handleResultClick,
    results,
    handleQueryChange,
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
    let newQuery = queries.filter(q => {
      return q.type === e.target.value
    })[0]

    console.log({ newQuery })
    handleQueryChange({ type, newQuery, index })
  }

  return (
    <CardWrapper>
      { !flipped &&
        <Front>
          <button onClick={ showBack } >Settings</button>
          <h3>{ results.name }</h3>
          <p><i>{ results.description }</i></p>
          <hr />
          <Ul>
            { results.data.length
              ? results.data.map((r, i) => <Li key={ `result-item-${index}-${i}` } onClick={ handleResultClick }>{ r.word }</Li>)
              : <p><i>No matches found</i></p>
            }
          </Ul>
        </Front>
      }

      { flipped &&
        <Back>
          <button onClick={ showFront } >Close</button>
          <h3>Card settings for { results.name }</h3>

          <h4>Choose search query</h4>
          <select onChange={ handleSelectQuery }>
            {
              queries.map((q, i) => <option
                key={ `${q.type}--${index}-${i}` }
                value={ q.type }
                selected={ type === q.type }
              >{ q.name }</option>)
            }
          </select>

          <p><i>{ results.description }</i></p>


        </Back>
      }
    </CardWrapper>
  )
}


export default Card
