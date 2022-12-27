import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Coin from './component/Coin';
import CoinDetails from './component/CoinDetails';
import Exchanges from './component/Exchanges';
import Footer from './component/Footer';
import Header from './component/Header';
import Home from './component/Home';


const App = () => {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/coins' element={<Coin/>}/>
          <Route exact path='/exchange' element={<Exchanges/>}/>
          <Route exact path='/coin/:id' element={<CoinDetails/>}/>
        </Routes>
        <Footer/>
      </Router>
    </>
  )
}

export default App