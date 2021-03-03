import Head from 'next/head'
import Styled from 'styled-components'

import SearchInput from '../components/search-input'


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


export default function Home () {
  return (
    <Container>
      <Head>
        <title>Headline-ificator | Word association</title>
        <link rel="icon" href="/favicon.ico" />

        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

      <main>
        <Title>
          Word association
        </Title>
        <SearchInput />
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
