import React from 'react'
import './App.scss'
import MainPage from './pages/main/MainPage'
import Auth from './pages/auth/Auth'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './layout/Header/Header'
import { AuthProvider } from './contexts/authContext/AuthContext'
import Login from './pages/auth/sections/Login'
import Register from './pages/auth/sections/Register'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="auth" element={<Auth />} >
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
