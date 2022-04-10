import React from 'react'
import Products from './sections/Products/Products'
import Schedule from './sections/Schedule/Schedule'
import Reviews from './sections/Reviews/Reviews'
import Footer from './sections/Footer/Footer'
import './MainPage.scss'

const MainPage: React.FC = () => {
  return (
    <>
      <Products />
      <Schedule />
      <Reviews />
      <Footer />
    </>
  )
}

export default MainPage
