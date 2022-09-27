import React from 'react'
import styled from 'styled-components'
import { vars } from '../styles/Global'
import { HiStar } from 'react-icons/hi'

const Stays = ({ stays }) => {

  return (
    <StyledMain>
      <div className='heading-container'>
        <h1>Stays in Finland</h1>
        <p>{stays.length}+ stays</p>
      </div>
      <div className='stays-container'>
        {
          stays.map(stay => {
            return <div className='stay-container' key={stay.photo}>
              <div className='img-container'><img src={stay.photo} alt="" /></div>
              <div className='info-holder'>
                <div className='type-holder'>
                  {stay.superHost && <p className='superhost'>super host</p>}
                  {stay.beds ?
                    <p className='type'>{stay.type} , {stay.beds}</p> :
                    <p className='type'>{stay.type} {stay.beds}</p>
                  }
                </div>
                <div className='rating-holder'>
                  <HiStar className='star' />
                  <p className='rating'>{stay.rating}</p>
                </div>
              </div>
              <p className='title'>{stay.title}</p>
            </div>
          })
        }
      </div>
    </StyledMain>
  )
}

const StyledMain = styled.main`
margin-top: 36px;
width: 93vw;
max-width: ${vars.desktopWidth};

.heading-container {
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: ${vars.darkGray};
  }

  p {
    font-size: 14px;
    color: ${vars.gray};
  }
}

.stays-container {
  margin-top: 24px;
  padding-bottom: 50px;
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;

  .stay-container {
    cursor: pointer;
  }

  .stay-container:hover img {
    scale: 1.1;
  }
  .stay-container:hover .img-container {
    box-shadow: 0 72px 0 4px #f9f9f9;
  }
  .stay-container:hover .star {
    opacity: 1;
  }

  .img-container {
    border-radius: 24px;
    overflow: hidden;
    margin-bottom: 10px;
  }

  img {
    display: block;
    width: 350px;
    height: 238px;
    border-radius: 24px;
  }

  .info-holder {
    display: flex;
    justify-content: space-between;

    .type-holder {
      display: flex;
      gap: 10px;
    }

    .superhost {
      font-weight: 700;
      font-size: 10px;
      text-transform: uppercase;
      outline: 1px solid ${vars.gray};
      color: ${vars.gray};
      padding: 9px 6px;
      border-radius: 12px;
    }

    .type {
      font-size: 12px;
      color: ${vars.lightGray};
      margin-top: 8px;
    }
  }

  .rating-holder {
    display: flex;
    margin-top: 8px;

    .star {
      color: ${vars.paleRed};
      opacity: .72;
    }

    .rating {
      font-size: 12px;
      color: ${vars.darkGray};
      margin-left: 6px;
    }
  }

  .title {
    font-size: 14px;
    font-weight: 600;
    color: ${vars.darkGray};
    margin-top: 10px;
  }
}

@media screen and (min-width: 439px) {
    .stays-container img {
      width: 395px;
      height: 269px;
    }
}

@media screen and (min-width: 884px) {
  margin-top: 60px;
  
  .stays-container {
    margin-top: 32px;
    row-gap: 50px;
  }
}
`
export default Stays