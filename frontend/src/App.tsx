import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shorturl from "./components/Shorturl"


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Welcome to URL Shortener</div>} />
        <Route path="/create" element={<Shorturl />} />
        <Route path="/get" element={<div>Get URL Details Page</div>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
