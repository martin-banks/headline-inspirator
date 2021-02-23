import Ract from 'react'
import Styled from 'styled-components'

const Section = Styled.section`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  width: 100vw;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 50px;
  padding-bottom: 50px;
  border-bottom: solid 4px #e2e2e2;
`

function SectionContainer (props) {
  const { children } = props

  return <Section>
    { children }
  </Section>
}

export default SectionContainer
