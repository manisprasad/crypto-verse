import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import CoinDetails from './pages/coinDetails/CoinDetails';
import PageNotFound from './pages/404/PageNotFound';


import './index.css';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Footer from './components/navbar/Footer';
const App = () => {
 
  return (
    <div className='app'>
      <Navbar />
    
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/coin/:coinId' element={<CoinDetails />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>

      <Footer/>
    </div>
  );
};

export default App;
