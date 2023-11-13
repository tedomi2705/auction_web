import { useState } from 'react'
import './App.css'
import StickyNavbar from './components/StickyNavbar'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import SignupPage from './components/SignupPage';
import Profile from './components/Profile';
import Home from './components/Home';
import AuctionPage from './components/AuctionPage';
import Checkout from './components/Checkout';
import PaymentStatus from './components/Paymentstatus';
import ViewPaymentStatus from './components/ViewPaymentStatus';
import UpdateProductStatus from './components/UpdateProductStatus';
import RegisterProduct from './components/RegisterProduct';
import RegisterAuction from './components/RegisterAuction';

function App() {
  return (
    <Router>
      <StickyNavbar />
      <div className="routes-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/auction' element={<AuctionPage />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/paymentstatus' element={<PaymentStatus />} />
          <Route path='/viewpaymentstatus' element={<ViewPaymentStatus />} />
          <Route path='/updateproductstatus' element={<UpdateProductStatus />} />
          <Route path='/registerproduct' element={<RegisterProduct />} />
          <Route path='/registerauction' element={<RegisterAuction />} />

        </Routes>
      </div>
    </Router >
  );
}

export default App;