import React, { useEffect } from 'react'
import './App.scss'
import MainPage from './pages/main/MainPage'
import Auth from './pages/auth/Auth'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './layout/Header/Header'
import { AuthProvider } from './contexts/authContext/AuthContext'
import Login from './pages/auth/sections/Login'
import Signup from './pages/auth/sections/Signup'
import { CartProvider } from './contexts/cartContext/CartContext'
import Products from './pages/admin/Products/Products'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />

          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="auth" element={<Auth />} >
              <Route path="login" element={<Login/>} />
              <Route path="signup" element={<Signup/>} />
            </Route>
            <Route path="/admin/products" element={<Products />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
