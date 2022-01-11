import React from 'react'
import './Home.css'
import Product from './Product'

const Home = () => {
  return (
    <>
      <div className='home'>
        <div className='home__container'>
          <img
            className='home_image'
            src='https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'
            alt='hero'
          />
          <div className='home__row'>
            <Product
              id='12321341'
              title='The lean startup'
              price={29.99}
              image='https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg'
              rating={5}
            />
            <Product
              id='49538094'
              title='iPad Air iPad 5th Case, Heavy Duty Luxury  Three Layers Full-Body Protective Silicone iPad Cover '
              price={11.99}
              image='https://images-na.ssl-images-amazon.com/images/I/61UaA8yOggL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
              rating={5}
            />
          </div>
          <div className='home__row'>
            <Product
              id='4568979'
              title='Ninja AF101 Air Fryer, 4 Qt, Black/gray '
              price={89.99}
              image='https://images-na.ssl-images-amazon.com/images/I/71DKkQ8EahL.__AC_SX300_SY300_QL70_FMwebp_.jpg'
              rating={4}
            />
            <Product
              id='4565879'
              title='Amazon Basics Small Digital Alarm Clock with LED Display, Nightlight
            and Battery Backup - 4.5 x 3.5 x 2.4 Inches'
              price={14.99}
              image='https://m.media-amazon.com/images/I/61j17FjPhtL._AC_SL1500_.jpg'
              rating={3}
            />

            <Product
              id='48785879'
              title='2021 Apple 12.9-inch iPad Pro (Wi‑Fi, 512GB) - Silver'
              price={1399.0}
              image='https://m.media-amazon.com/images/I/815KnP2wjDS._AC_SL1500_.jpg'
              rating={5}
            />
          </div>
          <div className='home__row'>
            <Product
              id='45789879'
              title='SAMSUNG LC49RG90SSNXZA 49-Inch CRG9 Curved Gaming Monitor, Black,
            QHD, 120Hz'
              price={1399.0}
              image='https://m.media-amazon.com/images/I/71tZW1aa+PL._AC_SL1500_.jpg'
              rating={5}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
