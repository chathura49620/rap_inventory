
import './App.css';
import Dashboard from "./Dashboard";
import Customer from './pages/customer';
import Cart from './pages/customer/cart';
import BillingInfo from './pages/customer/billingInfo';
import ViewStock from './pages/customer/viewStock';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/billing-info" element={<BillingInfo />} />
          <Route path="view-Stock" element={<ViewStock />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
