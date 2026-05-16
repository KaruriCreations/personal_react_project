import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './assets/pages/HomePage'; 
import ProductPage from './assets/pages/ProductPage';
import AdminPage from './assets/pages/AdminPage';
import ProductForm from './assets/components/ProductForm';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ProductPage />} />
      <Route path="/admin" element={<AdminPage />}>
        <Route path="product-form" element={<ProductForm />} />
      </Route>
    </Routes> 
    </BrowserRouter>
    </>
   )
}

export default App
