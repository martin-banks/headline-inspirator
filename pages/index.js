import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Styled from 'styled-components'

import Dump from '../components/dump'
import SearchPhrase from '../components/search-phrases'
import PhraseList from '../components/phrase-list'
import Title from '../components/page-title'
import LoadingSpinner from '../components/loading'

import processDictPage from '../helpers/process-dict-response'


const Container = Styled.div`
  display: grid;
  grid-template-rows: auto 100px;
  min-height: 100vh;
`
const Footer = Styled.footer`
  width: 100%;
  height: 100px;
  border-top: 1px solid #eaeaea;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    text-decoration: none;
  }
`
const Search = Styled.form`
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 40px;
  display: grid;
  justify-content: center;
  align-items: center;
  input[type=text] {
    font-size: 30px;
    padding: 10px;
    width: 100%;
    margin-bottom: 10px;
  }
  input[type=submit] {
    font-size: 18px;
    padding: 10px;
    background: #ccc;
    border: none;
    border-radius: 8px;
    &:hover {
      cursor: pointer;
      background: slategrey;
    }
  }
`
const SearchWords = Styled.div`
  margin: 0 auto;
  max-width: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-content: center;
`
const SearchWordsItem = Styled.div`
  border: solid 1px lightgrey;
  * {
    text-align: center;
  }
  h4 {
    margin: 0;
    padding: 10px;
    background: lightgrey;
  }
  p {
    font-size: 30px;
    padding: 0;
  }
`
const ResultContainer = Styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`
const Ul = Styled.ul`
  margin: 0;
  padding: 0;
`
const Rhyme = Styled.li`
  margin: 0;
  padding: 5px 15px;
  list-style: none;
  cursor: pointer;
  background: ${ p => p.selected ? 'lightsteelblue' : 'rgba(0,0,0, 0.1)'};
  border-radius: 4px;
  display: inline-block;
  margin: 2px;
  border: solid 2px rgba(0,0,0,0);
  &:hover {
    background: ${ p => p.selected ? 'steelblue' : 'rgba(0,0,0, 0.3)'};
    border-color: ${ p => p.selected ? 'darkslategrey' : 'rgba(0,0,0,0.4)'};
  }
`

export default function Home (props) {
  const { phrases, rhymes, error } = props
  const router = useRouter()
  const [ keyword, storeKeyword ] = useState(null)
  const [ replace, storeReplace ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(true)

  const handleSearch = e => {
    e.preventDefault()
    setIsLoading(true)
    storeReplace(null)
    storeKeyword(e.target.keyword.value)
    router.push(`/?search=${e.target.keyword.value.trim().toLowerCase()}`)
  }
  const handleWordSwap = (e) => {
    storeReplace(e.target.innerText)
  }

  useEffect(() => {
    setIsLoading(false)
  }, [phrases])




  return (
    <Container>
      <main>
        <Title title="Headline-ificator" />

        <Search
          onSubmit={ handleSearch }
        >
          <input id="keyword" name="keyword" type="text" />
          <input type="submit" value="Search" />
        </Search>

        {/* <SearchPhrase /> */}

        <SearchWords>
          <SearchWordsItem>
            <h4>Searched for</h4>
            <p>{ keyword || '--' }</p>
          </SearchWordsItem>
          <SearchWordsItem>
            <h4>Replaced with</h4>
            <p>{ replace || '--' }</p>
          </SearchWordsItem>
        </SearchWords>

        <ResultContainer>
          { rhymes &&
            <div>
              <h3>Rhymes</h3>
              <Ul>
                {
                  rhymes.map(r => <Rhyme
                    selected={ r.word === replace }
                    onClick={ handleWordSwap }
                  >{ r.word }</Rhyme>)
                }
              </Ul>
            </div>
          }

          { phrases && <PhraseList
            phrases={ phrases }
            search={ keyword }
            replace={ replace }
          /> }
        </ResultContainer>

      </main>

      { isLoading && <LoadingSpinner /> }

      <Footer>
        <a
          href="https://martinbanks.com.au"
          target="_blank"
          rel="noopener noreferrer"
        >© Martin Banks
        </a>
      </Footer>

    </Container>
  )
}


// Performs 'server-side' functions that pass data onto the page function as it's props
export async function getServerSideProps (context) {
  const { query } = context
  // const phraseEndpoint = phrase => `https://www.stands4.com/services/v2/phrases.php?uid=${process.env.STANDS4_ID}&tokenid=${process.env.STANDS4_TOKEN}&phrase=${phrase}&format=json`

  if (query?.search?.length) {
    try {
      const dictResponse = await fetch(`https://idioms.thefreedictionary.com/${query.search}`)
      const dictText = await dictResponse.text()
      const phrases = processDictPage(dictText)
      if (!phrases) {
        throw 'Phrases not found'
      }

      const rhymesResponse = await fetch(`https://api.datamuse.com/words?rel_rhy=${query.search}&max=100`)
      const rhymes = await rhymesResponse.json()
      return { props: { phrases, rhymes }}

    } catch (error) {
      console.error('--- ERROR FETCHING DATA ---\n', error)
      return { props: { error, }}
    }
  } else {
    return { props: {} }
  }
}
