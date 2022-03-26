import React from 'react'
import Groups from './sections/Groups/Groups'
import Schedule from './sections/Schedule/Schedule'
import Reviews from './sections/Reviews/Reviews'
import Contacts from './sections/Contacts/Contacts'
import Footer from './sections/Footer/Footer'
import './MainPage.scss'

const MainPage: React.FC = () => {
  return (
    <>
      <Groups />
      <Schedule />
      <Reviews />
      <Contacts />
      <Footer />
    </>
  )
}

export default MainPage
