import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './views/Register'
import Login from './views/Login'
import Chat from './views/Chat'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Chat/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App