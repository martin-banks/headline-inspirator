import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'


const Ul = Styled.ul`
`

const Li = Styled.li`
  margin: 0;
  padding: 5px 0px;
  span {
    background: lightsteelblue;
  }
`

function PhraseList (props) {
  const { phrases, search, replace } = props
  const [ wordsToRender, storeWordsToRender] = useState([])

  useEffect(() => {
    if (search && replace) {
      const replacements = phrases
        .map(p => p
            .toLowerCase()
            .replace(search, `<span>${ replace }</span>`)
          )
      storeWordsToRender(replacements)
    } else {
      storeWordsToRender(phrases)
    }
  }, [search, replace, phrases])

  return <div>
    <h3>Phrases</h3>
      <Ul>
      {
        wordsToRender
          .map((p, i) => <Li key={ `phrase-${i}` } dangerouslySetInnerHTML={{ __html: p}}/>)
        }
    </Ul>
  </div>
}

export default PhraseList
