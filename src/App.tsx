import React from 'react'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './layout/Header/Header'
import { AuthProvider } from './contexts/authContext/AuthContext'
import NotFound from './pages/NotFound/NotFound'
import MainPage from './pages/MainPage/MainPage'
import Auth from './pages/Auth/Auth'
import Login from './pages/Auth/sections/Login'
import Signup from './pages/Auth/sections/Signup'
import News from './pages/News/News'
import Services from './pages/Services/Services'
import About from './pages/About/About'
import Contacts from './pages/Contacts/Contacts'
import Account from './pages/Account/Account'
import { NewsProvider } from './contexts/newsContext/NewsContext'
import { CommentsProvider } from './contexts/commentsContext/CommentsContext'
import UserData from './pages/Account/components/UserData'
import EditPassword from './pages/Account/components/EditPassword'
import EditUserData from './pages/Account/components/EditUserData'
import { ServicesProvider } from './contexts/servicesContext/ServicesContext'
import { YMaps } from 'react-yandex-maps'

// корень приложения с роутером для навигации по сайту и провайдерами, для управления логикой сайта
function App() {
  return (
    <BrowserRouter>
      <YMaps>
        <AuthProvider>
          <ServicesProvider>
            <NewsProvider>
              <CommentsProvider>
                <Header/>

                <Routes>
                  <Route path="/" element={<MainPage/>}>
                    <Route path="/" element={<News/>}/>
                    <Route path="/services" element={<Services/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/account" element={<Account/>}>
                      <Route path="" element={<UserData/>}/>
                      <Route path="user" element={<EditUserData/>}/>
                      <Route path="password" element={<EditPassword/>}/>
                    </Route>
                    {/*<Route path="/cart" element={<Cart />} />*/}
                  </Route>
                  <Route path="auth" element={<Auth/>}>
                    <Route path="login" element={<Login/>}/>
                    <Route path="signup" element={<Signup/>}/>
                  </Route>
                  <Route path="*" element={<NotFound/>}/>
                </Routes>
              </CommentsProvider>
            </NewsProvider>
          </ServicesProvider>
        </AuthProvider>
      </YMaps>
    </BrowserRouter>
  )
}

export default App
