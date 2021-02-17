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
        <title>Headline Inspirator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>
          Headline Inspirator
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


      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

      `}</style>
    </Container>
  )
}
