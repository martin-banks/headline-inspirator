import React, { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Styled from 'styled-components'

import Dump from '../components/dump'
import SearchPhrase from '../components/search-phrases'
import PhraseList from '../components/phrase-list'

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
const Title = Styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
  text-align: center;
`


export default function Home (props) {
  const { phrases, rhymes, error } = props
  const router = useRouter()
  const [ keyword, storeKeyword ] = useState(null)
  const [ replace, storeReplace ] = useState(null)

  const handleSearch = e => {
    e.preventDefault()
    storeKeyword(e.target.keyword.value)
    router.push(`/phrases?search=${e.target.keyword.value.trim().toLowerCase()}`)
  }
  const handleWordSwap = (e) => {
    console.log(e.target.innerText)
    storeReplace(e.target.innerText)
  }


  return (
    <Container>
      <Head>
        <title>Phrases from keyword</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>Phrases from keyword</Title>

        <form
          onSubmit={ handleSearch }
        >
          <input id="keyword" name="keyword" type="text" />
          <input type="submit" value="Search" />
        </form>

        {/* <SearchPhrase /> */}

        { rhymes &&
          // <Dump>{ JSON.stringify(rhymes, null, 2)}</Dump>
          <ul>
            { rhymes.map(r => <li onClick={ handleWordSwap }>{ r.word }</li>)}
          </ul>
        }

        { phrases && <PhraseList
          phrases={ phrases }
          search={ keyword }
          replace={ replace }
        /> }
      </main>

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


export async function getServerSideProps (context) {
  const { query } = context
  // const phraseEndpoint = phrase => `https://www.stands4.com/services/v2/phrases.php?uid=${process.env.STANDS4_ID}&tokenid=${process.env.STANDS4_TOKEN}&phrase=${phrase}&format=json`

  if (query?.search?.length) {
    console.log('fetching data')
    try {
      const dictResponse = await fetch(`https://idioms.thefreedictionary.com/${query.search}`)
      const dictText = await dictResponse.text()
      const phrases = processDictPage(dictText)
      if (!phrases) {
        throw 'Phrases not found'
      }
      console.log({ phrases})

      const rhymesResponse = await fetch(`https://api.datamuse.com/words?rel_rhy=${query.search}&max=10`)
      const rhymes = await rhymesResponse.json()
      return { props: { phrases, rhymes }}

    } catch (error) {
      console.error('--- ERROR FETCHING DATA ---\n', error)
      return { props: { error }}
    }
  } else {
    return { props: {} }
  }
}
