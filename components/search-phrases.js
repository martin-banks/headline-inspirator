import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import SectionContainer from './section-container'
import PageTitle from './page-title'
import Form from './form'
import InputText from './input-text'

function SearchPhrases () {
  const [ keyword, updateKeyword ] = useState(null)
  const [ idiomResults, storeIdiomResults ] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    console.log('target', e.target)
    const word = e.target.keyword.value
    updateKeyword(word)
    console.log('Keyword stored')
  }

  useEffect(() => {
    if (!keyword) return


  }, [ keyword ])


  return <article>
    <SectionContainer>
      <PageTitle subhead="Enter keyword to find related phrases"/>
    </SectionContainer>

    <SectionContainer>
      <form onSubmit={ handleSubmit }>
        <input type="text" name="keyword" id="keyword" />
        <input type="submit" />
      </form>
    </SectionContainer>

    {
      idiomResults &&
        <SectionContainer>
          <ul>
            {
              idiomResults.map(x => <li>{ x }</li>)
            }
          </ul>
        </SectionContainer>
    }
  </article>
}


export default SearchPhrases
