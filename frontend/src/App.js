
import './App.css';
import Dashboard from "./Dashboard";
import Customer from './pages/customer';
import Cart from './pages/customer/cart';
import BillingInfo from './pages/customer/billingInfo';
import ViewStock from './pages/customer/viewStock';
import Notifications from './pages/customer/NotificationsPg';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from '@mui/material';
import Header from './components/customer/Header';

function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md" style={{ marginTop: 20 }}>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customer" element={<Customer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/billing-info" element={<BillingInfo />} />
            <Route path="/view-Stock" element={<ViewStock />} />
            <Route path="notifications" element={<Notifications />} />
          </Routes>
        </Router>
      </Container>
    </>
  );
}

export default App;
