import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AiOutlineSearch, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { IoClose, IoLocationSharp } from 'react-icons/io5'
import { vars } from '../styles/Global'

const Search = ({ setDisplayedStays, cities, stays }) => {

  const [location, setLocation] = useState("Pick location")
  const [guests, setGuests] = useState(0)
  const [adults, setAdults] = useState(0)
  const [children, setChildren] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [searchState, setSearchState] = useState(false)

  const searchHandler = () => {
    let filteredStays = stays.filter(stay => stay.city === location)
    if (location === "Pick location") {
      filteredStays = stays
    }
    filteredStays = filteredStays.filter(stay => stay.maxGuests > guests)

    setDisplayedStays(filteredStays)
    setShowModal(false)
  }

  useEffect(() => {
    setGuests(adults + children)
  }, [adults, children])
  return (<>
    <StyledDiv>
      <button className={location === "Pick location" ? "btn light" : "btn"} onClick={() => {
        setShowModal(true)
        setSearchState(false)
      }}>
        {location === "Pick location" ? location : location + ", Finland"}
      </button>
      <button className={guests === 0 ? "btn light" : "btn"} onClick={() => {
        setShowModal(true)
        setSearchState(true)
      }}>
        {
          guests === 0 ? "Add guests" : guests === 1 ? guests + " guest" : guests + " guests"
        }
      </button>
      <AiOutlineSearch className='search-icon' size={22} />
    </StyledDiv>

    {showModal && (
      <StyledModal>
        <div className='modal-container'>

          <div className='modal-header'>
            <p>Edit your search</p>
            <button onClick={() => setShowModal(false)}><IoClose className='close-icon' size={26} /></button>
          </div>

          <div className='search-container'>
            <button onClick={() => setSearchState(false)} className={searchState ? 'option-btn' : 'option-btn option-selected'}>
              <h2>location</h2>
              <p className={location === "Pick location" ? "light" : null}>          {location === "Pick location" ? location : location + ", Finland"}</p>
            </button>
            <button onClick={() => setSearchState(true)} className={searchState ? 'option-btn option-selected' : 'option-btn'}>
              <h2>guests</h2>
              <p className={guests === 0 ? "light" : null}>{
                guests === 0 ? "Add guests" : guests === 1 ? guests + " guest" : guests + " guests"
              }</p>
            </button>

            <div className='search-btn-holder'>
              <button className='search-btn' onClick={searchHandler}>
                <AiOutlineSearch size={22} />
                <p>Search</p>
              </button>
            </div>
          </div>

          {!searchState && (
            <div className='locations-container'>
              <ul>
                {cities.map(city => {
                  return <li key={city}><button value={city} className='locations-btn' onClick={() => setLocation(city)
                  }>
                    <IoLocationSharp size={22.2} />
                    <p>{city}, Finland</p>
                  </button></li>
                })}
                <li><button value="Pick location" className='locations-btn' onClick={() => setLocation("Pick location")}>
                  <IoLocationSharp size={22.2} />
                  <p>All locations</p></button></li>
              </ul>
              <div className='selection-holder'></div>
              <div className='selection-holder-2'></div>
            </div>
          )}
          {searchState && (
            <div className='guests-container'>
              <div className='selection-holder'></div>
              <div>
                <div className='guest'>
                  <h3>Adults</h3>
                  <p>Ages 13 or above</p>
                  <div className='guest-btn-container'>
                    <button onClick={() => {
                      if (adults > 0) {
                        setAdults(prev => prev - 1)
                      }
                    }}><AiOutlineMinus /></button>
                    <span>{adults}</span>
                    <button onClick={() => setAdults(prev => prev + 1)}><AiOutlinePlus /></button>
                  </div>
                </div>

                <div className='guest'>
                  <h3>Children</h3>
                  <p>Ages 2-12</p>
                  <div className='guest-btn-container'>
                    <button onClick={() => {
                      if (children > 0) {
                        setChildren(prev => prev - 1)
                      }
                    }}><AiOutlineMinus /></button>
                    <span>{children}</span>
                    <button onClick={() => setChildren(prev => prev + 1)}><AiOutlinePlus /></button>
                  </div>
                </div>
              </div>
              <div className='selection-holder-2'></div>
            </div>
          )}
        </div>
        <div className='modal-bg' onClick={() => setShowModal(false)}></div>
      </StyledModal>
    )}
  </>)
}

const StyledModal = styled.div`
width: 100%;
height: 100%;
position: fixed;
top: 0;
left: 0;
z-index: 1;
display: grid;
grid-template-rows: auto 1fr;

.modal-container {
  background: #FFF;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.modal-header {
  margin-top: 18px;
  width: 93%;
  display: flex;
  justify-content: space-between;

  p {
    font-size: 12px;
    font-weight: 700;
    font-family: 'Mulish';
    color: ${vars.darkGray};
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  
  .close-icon {
    margin: -7px;
    color: ${vars.darkGray}
  }
}

.search-container {
  width: 93%;
  margin-top: 16px;
  border: none;
  border-radius: 16px;
  background: transparent;
  border: 1px solid #F2F2F2;
  box-shadow: 0 0 2px #F2F2F2;
  display: grid;
  grid-template-rows: 1fr 1fr;
  overflow: hidden;

  .option-btn {
    background: transparent;
    border: none;
    border-bottom: 1px solid #F2F2F2;
    cursor: pointer;
    padding: 12px 26px;
    text-align: start;
    font-family: 'Mulish';
  }

  h2 {
    font-size: 9px;
    font-weight: 800;
    text-transform: uppercase;
  }

  p {
    font-size: 12px;
  }

  .light {
    color: ${vars.veryLightGray};
  }

  .search-btn-holder {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-bottom: 24px;
    border-radius: 16px;
  }

  .search-btn {
  display: flex;
  align-items: center;
  border: none;
  background: ${vars.paleRed};
  opacity: .9;
  color: white;
  font-family: 'Mulish';
  padding: 15px 25px;
  border-radius: 16px;
  cursor: pointer;

    p {
      margin-left: 10px;
      font-size: 14px;
      font-weight: 500;
    }
  }

  .search-btn:active {
    opacity: 1;
  }
}

.locations-container {
  width: 93%;
  margin-top: 32px;
  margin-bottom: 187px;
  display: flex;
  flex-direction: column;

  ul {
    list-style: none;
  }

  .locations-btn {
    margin-left: 20px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    border: none;
    background: none;
    cursor: pointer;
  }
}

.guests-container {
  width: 93%;
  margin-top: 4px;
  margin-bottom: 237px;

  .guest {
    margin-left: 20px;
    margin-top: 48px;
  }

  h3 {
    font-size: 14px;
    color: ${vars.darkGray};
    font-weight: 700;
  }

  p {
    margin-top: 3px;
    font-size: 14px;
    color: ${vars.veryLightGray};
    font-weight: 400;
  }

  .guest-btn-container {
    margin-top: 12px;

    button {
      width: 23px;
      height: 23px;
      background: none;
      color: ${vars.gray};
      border: 1px solid ${vars.gray};
      border-radius: 4px;
      cursor: pointer;
    }

    span {
    margin: 0 15px;
  }
  }
}

.modal-bg {
  width: 100%;
  background: #4F4F4F;
  opacity: .4;
}

@media screen and (min-width: 884px) {

  .modal-header {
    display: none;
  }

  .search-container {
    margin-top: 93px;
    max-width: 1248px;
    grid-template-columns: 1fr 1fr auto;
    grid-template-rows: auto;
    gap: 1px;

    .option-btn {
      position: relative;
      background: transparent;
      border: 1px solid transparent;
      cursor: pointer;
      padding: 12px 26px;
      text-align: start;
      font-family: 'Mulish';
    }

    .option-btn::after {
      content: "";
      position: absolute;
      top: 0;
      right: -2px;
      width: 1px;
      height: 100%;
      background-color: #F2F2F2;
    }

    .option-selected {
      border: 1px solid ${vars.darkGray};
      border-radius: 16px;
    }

    .search-btn-holder {
    position: relative;
    left: 0;
    transform: translateX(0);
    margin-bottom: 0;
    display: flex;
    justify-content: center;
    width: 395px;
  }
  }

  .locations-container {
  max-width: 1248px;
  margin-top: 52px;
  margin-bottom: 0px;
}

  .guests-container {
    max-width: 1248px;
    margin-bottom: 70px;
    display: grid;
    grid-template-columns: 1fr 1fr 395px;
  }
}
`

const StyledDiv = styled.div`
  width: 297px;
  height: 55px;
  margin: 0 auto;
  margin-top: 40px;
  border: none;
  border-radius: 16px;
  background: transparent;
  outline: 1px solid #F2F2F2;
  box-shadow: 0 0 2px #F2F2F2;
  display: grid;
  grid-template-columns: 1fr 1fr auto;


  .btn {
    background: transparent;
    height: 100%;
    border: none;
    border-right: 1px solid #F2F2F2;
    cursor: pointer;
  }

  .light {
    color: ${vars.veryLightGray};
  }

  .search-icon {
    padding: 16px;
    color: ${vars.paleRed};
    opacity: .9;
  }

@media screen and (min-width: 439px) {
    margin: 0;
}
`

export default Search