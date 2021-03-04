
// import Head from 'next/head'
import Styled from 'styled-components'

import SearchInput from '../components/search-input'
import PageTitle from '../components/page-title'


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
// const Title = Styled.h1`
//   margin: 0;
//   line-height: 1.15;
//   font-size: 4rem;
//   text-align: center;
// `


export default function Home () {
  return (
    <Container>
      <main>
        <PageTitle title="Word association" />
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
