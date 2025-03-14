import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Home from './components/Home'
import Comics from './components/Comics'
function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/comics" element={<Comics />} />
        </Routes>
      </Router>
      
    </>
  )
}

export default App
