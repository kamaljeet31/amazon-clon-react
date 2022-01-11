import React from 'react'
import './Footer.css'

const Footer = () => {
  let getYear = () => {
    let currentYear = new Date().getFullYear()
    return currentYear
  }
  return (
    <>
      <div className='clear'></div>
      <div className='copyrightText'>
        <div className='footer_Text'>
          Copyright &#9400; <a href='#intro'>kamaljeetsingh.com</a>
          {getYear()}
        </div>
      </div>
    </>
  )
}

export default Footer
