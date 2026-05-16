import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './assets/pages/HomePage'; 


function App() {
  return (
    <>
    <h1>hello world</h1>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes> 
    </BrowserRouter>
    </>
   )
}

export default App
