import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Shorturl from "./components/Shorturl"


function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Shorturl />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
