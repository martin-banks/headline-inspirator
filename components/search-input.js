import React, { useState, useEffect, useRef } from 'react'
import Styled from 'styled-components'

import Dump from '../components/dump'
import Card from '../components/result-card'
import Loading from '../components/loading'
import AddNewCard from '../components/add-new-card'


const InputContainer = Styled.section`
  display: grid;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
`
const TextInput = Styled.input`
  display: block;
  width: 100%;
  margin-bottom: 30px;
  padding: 10px 20px;
  font-size: 24px;
  text-align: center;
`
const Submit = Styled.input`
  padding: 10px;
  font-size: 24px;
  cursor: pointer;
`
const CardContainer = Styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 20px;
`



function SearchInput (props) {
  const [ searchWords, storeSearchWords ] = useState(null)
  const [ results, storeResults ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false)

  const inputRef = useRef()

  const queries = {
    // ml: 'Similar in meaning',
    topics: 'Related topics',
    rel_rhy: 'Rhymes with',
  }

  const endPoint = `https://api.datamuse.com/words?`
  const limit = '10'

  const handleSubmit = e => {
    e.preventDefault()
    if (!isLoading) {
      const keywords = e.target.keywords.value
        .trim()
        .split(' ')
      storeSearchWords(() => keywords)
    }
  }
  const handleSubmitFromResult = e => {
    e.preventDefault()
    if (!isLoading) {
      inputRef.current.value = e.target.innerText
      const keywords = e.target.innerText
        .trim()
        .split(' ')
      storeSearchWords(() => keywords)
    }
  }

  useEffect(async () => {
    if (searchWords) {
      setIsLoading(true)

      for (let type of Object.keys(queries)) {
        await fetch(`${endPoint}${type}=${searchWords.join('+')}&max=${limit}`)
          .then(res => res.json())
          .then(data => {
            storeResults(prev => ({ ...prev, [type]: data }))
          })
          .catch(err => {
            setIsLoading(false)
          })
        }

        setIsLoading(false)
    }
  }, [ searchWords ])

  return (
    <section>
      <InputContainer>
        <h2>Enter keywords to begin</h2>
        <p><i>No punctuation, number or special characters. Lowercase only</i></p>

        <form onSubmit={ handleSubmit }>
          <TextInput ref={ inputRef } type="text" name="keywords" id="keywords" readOnly={ isLoading }/>
          <Submit type="submit" value="Go!" readOnly={ isLoading }/>
        </form>
      </InputContainer>

      <CardContainer>
        {
          Object.keys(results).map(k => <Card
            key={ `result-card-${queries[k]}` }
            handleResultClick={ handleSubmitFromResult }
            results={ results }
            title={ queries[k] }
            type={ k }
          />)
        }
        <AddNewCard />
      </CardContainer>

      {/* { results && <Dump>{ JSON.stringify(results, null, 2) }</Dump> } */}

      { isLoading && <Loading /> }

    </section>
  )
}

export default SearchInput
