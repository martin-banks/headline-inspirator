import React, { useState, useEffect, useRef } from 'react'
import Styled from 'styled-components'

import Dump from '../components/dump'
import Card from '../components/result-card'
import Loading from '../components/loading'
import AddNewCard from '../components/add-new-card'

import queries from '../queries-new.json'


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
  const [ userQueries, updateQueries ] = useState([])
  const inputRef = useRef()

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

  const changecardQuery = ({ index, type, newQuery }) => {
    updateQueries(prev => {
      const update = [ ...prev ]
      update[index] = newQuery
      console.log({ update })
      return update
    })
  }


  // Sets initial user query
  // TODO -> Store search preferences under account id
  useEffect(() => {
    updateQueries(prev => [ queries[0] ])
  }, [])

  // Clear any previously stored content
  // Store the new results everytime:
  // - new search is entered
  // - returned result is clicked on
  // - User changes the card settings
  useEffect(async () => {
    if (searchWords) {
      setIsLoading(true)
      storeResults([])

      for (let query of userQueries) {
        console.log({ query })
        const { formula, name, description, type } = query
        const url = formula
          .replace('<words>', searchWords.join('+'))
          .replace('<max>', limit)

        fetch(url)
          .then(res => res.json())
          .then(data => {
            const toStore = { data, name, description, type }
            console.log({ toStore })
            storeResults(prev => ([ ...prev, toStore ]))
          })
      }
      setIsLoading(false)
    }
  }, [ searchWords, userQueries ])

  return (
    <section>
      <InputContainer>
        <h2>Enter keywords to begin</h2>
        <p><i>No punctuation, numbers or special characters</i></p>

        <form onSubmit={ handleSubmit }>
          <TextInput ref={ inputRef } type="text" name="keywords" id="keywords" readOnly={ isLoading }/>
          <Submit type="submit" value="Go!" readOnly={ isLoading }/>
        </form>
      </InputContainer>

      { results.length
        ? <CardContainer>
          {
            results.map(result => <Card
              key={ `result-card-${result.type}` }
              index={ 0 }
              handleResultClick={ handleSubmitFromResult }
              handleQueryChange={ changecardQuery }
              results={ result }
              type={ result.type }
            />)
          }
          <AddNewCard />
        </CardContainer>
        : ''
      }

      {/* { results && <Dump>{ JSON.stringify(userQueries, null, 2) }</Dump> }
      { results && <Dump>{ JSON.stringify(results, null, 2) }</Dump> } */}

      { isLoading && <Loading /> }

    </section>
  )
}

export default SearchInput
