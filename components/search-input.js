import React, { useState, useEffect, useRef } from 'react'
import Styled from 'styled-components'

import Dump from '../components/dump'
import Card from '../components/result-card'
import Loading from '../components/loading'
import AddNewCard from '../components/add-new-card'

// import queries from '../queries'
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

  useEffect(() => {
    updateQueries(prev => {
      // const update = [ ...prev ]
      // update[0] = (queries[0])
      return [ queries[0] ]
    })
  }, [])

  const inputRef = useRef()


  // const endPoint = `https://api.datamuse.com/words?`
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

  useEffect(async () => {
    if (searchWords) {
      setIsLoading(true)

      // for (let type of Object.keys(queries)) {
      //   await fetch(`${endPoint}${type}=${searchWords.join('+')}&max=${limit}`)
      //     .then(res => res.json())
      //     .then(data => {
      //       storeResults(prev => ({ ...prev, [type]: data }))
      //     })
      //     .catch(err => {
      //       setIsLoading(false)
      //     })
      //   }

        // searchWords.join('+')}&max=${limit}

      // for (let queryKey of Object.keys(queries)) {
      //   try {
      //     // Build all of the queries for this entry in the database list
      //     console.log({queryKey}, queries[queryKey])
      //     const querySet = queries[queryKey]({ words: searchWords.join('+'), max: limit })
      //     // Itterate all of the queries for that database
      //     for (let q of querySet.queries) {
      //       const { name, description, type } = q
      //       await fetch(q.query)
      //         .then(res => res.json())
      //         .then(data => {
  
      //           const toStore = { data, name, description }
      //           console.log({ toStore })
      //           storeResults(prev => ({ ...prev, [type]: toStore }))}
      //         )
      //         .catch(err => console.error('--- ERROR FETCHING DATA ---\n', err))
      //     }
      //     console.error('--- ERROR CREATING QUERY SET ---\n', err)
      //   } catch (err) {
      //   }
      // }


      // for (let querySet of queries) {
      //   const { formula } = querySet

      //   for (let q of querySet.queries) {
      //     const { type, name, description, query  } = q
      //     const url = formula
      //       .replace('<query>', query)
      //       .replace('<words>', searchWords.join('+'))
      //       .replace('<max>', limit)
      //     fetch(url)
      //       .then(res => res.json())
      //       .then(data => {
      //         const toStore = { data, name, description }
      //         console.log({ toStore })
      //         storeResults(prev => ({ ...prev, [type]: toStore }))
      //       })
      //   }
      // }

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

      {/* { Object.keys(results).length
        ? <CardContainer>
          {
            Object.keys(results).map(k => <Card
              key={ `result-card-${results.type}` }
              index={ 0 }
              handleResultClick={ handleSubmitFromResult }
              handleQueryChange={ changecardQuery }
              results={ results[k] }
              type={ k }
            />)
          }
          <AddNewCard />
        </CardContainer>
        : ''
      } */}
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

      { results && <Dump>{ JSON.stringify(userQueries, null, 2) }</Dump> }
      { results && <Dump>{ JSON.stringify(results, null, 2) }</Dump> }

      { isLoading && <Loading /> }

    </section>
  )
}

export default SearchInput
