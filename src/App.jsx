import React from 'react'
import LandingPage from './screens/LandingPage'

import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import FishInfo from './screens/FishInfo'
import LoadingScreen from './screens/LoadingScreen';
function App() {
  

  return (
    <>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/fishinfo' element={<FishInfo/>}/>
      <Route path='/loading' element={<LoadingScreen/>} />

    </Routes>
    
    </>
  )
}

export default App
