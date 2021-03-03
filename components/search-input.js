import React, { useState, useEffect, useRef } from 'react'
import Styled from 'styled-components'

import Dump from '../components/dump'
import Card from '../components/result-card'
import Loading from '../components/loading'
import AddNewCard from '../components/add-new-card'
import ChainedSearch from '../components/chained-search'
import SectionContainer from '../components/section-container'

import queries from '../queries-new.json'


const Title = Styled.div`
  text-align: center;
  display: grid;
  justify-content: center;
  align-items: center;
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
  max-width: 200px;
  margin: 0 auto;
`
const CardContainer = Styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 20px;
`
const Form = Styled.form`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
`



function SearchInput (props) {
  const [ searchWords, storeSearchWords ] = useState(null)
  const [ results, storeResults ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ userQueries, updateQueries ] = useState([])
  const inputRef = useRef()

  const limit = '10'

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e.target.keywords.value)
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

  const changeCardQuery = ({ index, type, newQuery }) => {
    updateQueries(prev => {
      const update = [ ...prev ]
      console.log({ prev, update })
      update[index] = newQuery
      return update
    })
  }

  const addCard = () => {
    updateQueries(prev => [ ...prev, queries[0] ])
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
      // const prevResults = results.length ? [ ...results ] : []
      storeResults([])



      for (let [i, query] of userQueries.entries()) {
        console.log({ query, i })
        const { formula, name, description, type } = query
        const url = formula
          .replace('<words>', searchWords.join('+'))
          .replace('<max>', limit)

        fetch(url)
          .then(res => res.json())
          .then(data => {
            const toStore = { data, name, description, type }
            // console.log({ toStore })
            storeResults(prev => {
              const update = [ ...prev ]
              update[i] = toStore
              return update
            })
          })
      }
      setIsLoading(false)
    }
  }, [ searchWords, userQueries ])

  return (
    <article>
      <SectionContainer>
        <Title>
          <h2>Enter keywords to begin</h2>
          <p><i>No punctuation, numbers or special characters</i></p>
        </Title>

        <Form onSubmit={ handleSubmit }>
          <TextInput ref={ inputRef } type="text" name="keywords" id="keywords" readOnly={ isLoading }/>
          <Submit type="submit" value="Go!" readOnly={ isLoading }/>
        </Form>
      </SectionContainer>


      <SectionContainer>
        { results.length && <CardContainer>
            {
              results.map((result, i) => <Card
                key={ `resultcard-${i}-${result.type}` }
                index={ i }
                handleResultClick={ handleSubmitFromResult }
                handleQueryChange={ changeCardQuery }
                results={ result }
                type={ result.type }
              />)
            }
            <AddNewCard addCard={ addCard } />
          </CardContainer>
        }
      </SectionContainer>

      {/* { results && <Dump>{ JSON.stringify(userQueries, null, 2) }</Dump> } */}
      {/* { results && <Dump>{ JSON.stringify(results, null, 2) }</Dump> } */}



      <SectionContainer>
        <ChainedSearch
          initialKeywords={ searchWords }
          initialQueries={ userQueries }
        />
      </SectionContainer>

      { isLoading && <Loading /> }

    </article>
  )
}

export default SearchInput
