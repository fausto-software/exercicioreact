import React, { useEffect, useState } from 'react'
import { GlobalStyles, vars } from './styles/Global'
import styled from 'styled-components'
import Search from './components/Search'
import Stays from './components/Stays'
import stays from './stays.json'

const App = () => {
  const [displayedStays, setDisplayedStays] = useState(stays)
  const citySet = new Set
  const [cities, setCities] = useState([])

  useEffect(() => {
    stays.forEach(stay => {
      if (!citySet.has(stay.city)) {
        citySet.add(stay.city)
        setCities([...citySet])
      }
    })
  }, [])

  return (<>
    <GlobalStyles />
    <StyledHeader>
      <div className='logo-container'><img src="/images/logo.png" alt="windbnb" aria-hidden="true" /></div>
      <Search setDisplayedStays={setDisplayedStays} cities={cities} stays={stays} />
    </StyledHeader>
    <Stays stays={displayedStays} />
  </>)
}

const StyledHeader = styled.header`
margin-top: 22px;
display: flex;
flex-wrap: wrap;
justify-content: space-between;
width: 93vw;
max-width: ${vars.desktopWidth};

img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 15px;
}

@media screen and (min-width: 439px) {
    margin-top: 32px;
}
`

export default App