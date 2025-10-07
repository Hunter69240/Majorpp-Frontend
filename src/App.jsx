import React from 'react'
import LandingPage from './screens/LandingPage'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FishInfo from './screens/FishInfo'
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/fishinfo' element={<FishInfo/>}/>
    </Routes>
    
    </>
  )
}

export default App
