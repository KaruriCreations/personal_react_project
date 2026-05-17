import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ProductProvider} from './assets/components/ProductContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* wrapping the app with ProductProvider to provide the product data to all the components */}
    <ProductProvider>
    <App />
    </ProductProvider>
  </StrictMode>,
)
