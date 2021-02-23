import React, { useEffect, useState } from 'react'
import Styled from 'styled-components'

import SectionContainer from '../components/section-container'
import Card from '../components/result-card'

import queries from '../queries-new.json'


const CardContainer = Styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
  padding: 20px;
`


function ChainedSearch (props) {
  const {
    initialKeywords,
    initialQueries,
  } = props

  const [ chainedKeywords, storeChainedKeywords ] = useState(null)
  const [ chainedCategory, storeChainedCategory ] = useState(null)
  const [ queryUrls, storeQueryUrls ] = useState([])
  const [ chainedResults, storeChainedResults ] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    const cleanedKeywords = e.target.keywords.value
      .trim()
      .split(' ')

    storeChainedKeywords(() => cleanedKeywords)
    storeChainedCategory(() => e.target.category.value)

    storeQueryUrls(() => {
      return initialQueries
        .map(q => {
          const url = q.formula
            .replace('<words>', initialKeywords.join('+'))
            .replace('<max>', 10)
          return `${url}&${e.target.category.value}=${e.target.keywords.value}`
        })
    })
  }

  useEffect(() => {
    if (!initialKeywords) return
    if (!chainedKeywords && !chainedCategory) return

    storeChainedResults([])

    for(let [i, query] of initialQueries.entries()) {
      const { name, description, type, formula } = query
      const initialUrl = formula
        .replace('<words>', initialKeywords.join('+'))
        .replace('<max>', 10)
      
      const chainedUrl = `${initialUrl}&${chainedCategory}=${chainedKeywords.join('+')}`

      fetch(chainedUrl)
        .then(res => res.json())
        .then(data => {
          storeChainedResults(prev => {
            const update = [ ...prev ]
            update[i] = {
              data,
              type,
              name: `${query.name} & ${chainedCategory} for ${chainedKeywords.join('+')}`,
              description,
              title: `${query.name} & ${chainedCategory} for ${chainedKeywords.join('+')}`,
            }
            return update
          })
        })
        .catch(err => {
          console.error('--- ERROR FETCHING CHAINED RESULTS ---\n', err)
        })
    }
  }, [ chainedCategory, chainedKeywords, initialQueries, initialKeywords ])



  return <div>
    <h2>Chained results</h2>
    <p>Chain additional queriesto your initial search</p>

    <form onSubmit={ handleSubmit }>
      <select name="category">
        {
          queries.map((q, i) => <option
            key={ `chained-${i}-${q.query}` }
            value={ q.query }
          >{ q.name }</option>)
        }
      </select>
      <input name="keywords" type="text" />
      <input type="submit" value="GO!" />
    </form>

    <SectionContainer>
        { chainedResults?.length
          ? <CardContainer>
            {
              chainedResults.map((result, i) => <Card
                key={ `chainedcard-${i}-${result.type}` }
                index={ i }
                // handleResultClick={ handleSubmitFromResult }
                // handleQueryChange={ changeCardQuery }
                results={ result }
                type={ result.type }
              />)
            }
            {/* <AddNewCard addCard={ addCard } /> */}
          </CardContainer>
          : 'nope'
        }
      </SectionContainer>

    <section>
      <ul>
        { queryUrls.map(q => <li>{ q }</li>) }
      </ul>
    </section>

  </div>
}


export default ChainedSearch
