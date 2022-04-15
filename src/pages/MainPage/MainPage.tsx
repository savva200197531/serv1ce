import React from 'react'
import './MainPage.scss'
import { Outlet } from 'react-router-dom'
import Footer from '../../layout/Footer/Footer'

// главная страница
const MainPage: React.FC = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  )
}

export default MainPage
