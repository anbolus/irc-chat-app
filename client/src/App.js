import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './views/Register'
import Login from './views/Login'
import HomeChat from './views/HomeChat'

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<HomeChat/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App