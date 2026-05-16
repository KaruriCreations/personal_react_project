import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './assets/pages/HomePage'; 
import ProductPage from './assets/pages/ProductPage';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ProductPage />} />
    </Routes> 
    </BrowserRouter>
    </>
   )
}

export default App
