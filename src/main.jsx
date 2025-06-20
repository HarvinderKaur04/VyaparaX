import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import './index.css'
import Home from './components/Home';
import { CookiesProvider } from 'react-cookie';


// import Home from './pages/Home';
import { Login, Signup } from './pages';

createRoot(document.getElementById('root')).render(
  <StrictMode>
 <CookiesProvider>
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<Home/>}/>

    <Route path="/login" element={<Login/>} />
    <Route path="/signup" element={<Signup />} />
  
    
 
    </Routes>
    </BrowserRouter>
</CookiesProvider>
  
  </StrictMode>,
)
