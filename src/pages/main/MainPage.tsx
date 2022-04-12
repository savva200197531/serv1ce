import React from 'react'
import Products from './sections/Products/Products'
import Info from './sections/Info/Info'
import Reviews from './sections/Reviews/Reviews'
import Footer from './sections/Footer/Footer'
import './MainPage.scss'

// главная страница
const MainPage: React.FC = () => {
  return (
    <>
      <Products />
      <Info />
      <Reviews />
      <Footer />
    </>
  )
}

export default MainPage
