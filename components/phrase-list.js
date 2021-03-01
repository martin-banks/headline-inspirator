import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'


const Ul = Styled.ul`
  margin: 0;
  padding: 0;
`

const Li = Styled.li`
  margin: 0;
  padding: 5px 10px;
  list-style: none;
`

function PhraseList (props) {
  const { phrases, search, replace } = props
  const [ wordsToRender, storeWordsToRender] = useState([])

  useEffect(() => {
    if (search && replace) {
      const replacements = phrases.map(p => p.toLowerCase().replace(search, replace))
      storeWordsToRender(replacements)
    } else {
      storeWordsToRender(phrases)
    }
  })
  return <div>
    <h2>{ replace } | { search }</h2>
      <Ul>
      {
        wordsToRender
          .map(p => <Li>{ p }</Li>)
        }
    </Ul>
  </div>
}

export default PhraseList
