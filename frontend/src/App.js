import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from "./pages/login/login";
import Register from "./pages/register/register";
import Users from "./pages/superAdmin/User";
import Invitations from "./pages/superAdmin/Invitations";
import UserProfile from "./pages/userprofile/userProfile";
import Dashboard from "./Dashboard";
import Stock from "./pages/stock/Stock";
import RequestProduct from "./pages/stock/RequestProduct";
import ProductReport from "./pages/stock/ProductReport";
// import Sidebar from "./pages/common/Sidebar";
import VendorProduct from "./pages/vendor/vendorProduct";
import RequestedItems from './pages/vendor/RequestedItems/RequestedItems';
import TrackDelivery from './pages/vendor/TrackDelivery/TrackDelivery';
import Invoice from './pages/vendor/Invoice/Invoice';
import SalesReports from './pages/vendor/Reports/SalesReports';
import DeliveryReport from './pages/vendor/Reports/DeliveryReport';

import Customer from './pages/customer';
import Cart from './pages/customer/cart';
import BillingInfo from './pages/customer/billingInfo';
import ViewStock from './pages/customer/viewStock';
import Notifications from './pages/customer/NotificationsPg';
import Tracking from './pages/customer/Tracking';
import CustomerReports from './pages/customer/CustomerReports';
import axios from 'axios';
axios.defaults.headers.common['Authorization'] = `Bearer ${"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyb290QGdtYWlsLmNvbSIsImlhdCI6MTcyOTc5MTM3MywiZXhwIjoxNzI5ODc3NzczfQ.X8om33oxHfXy2W7iV9amm5vdHD_s8W1q1pu0mcglv7c"}`;
axios.defaults.headers.common['Content-Type'] = "application/json";


function App() {
  return (
    <Router>
      <div>
        {/* Sidebar */}
        {/* <Sidebar /> */}
        {/* <Header /> */}
        {/* Main Content */}
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/request-products" element={<RequestProduct />} />
            <Route path="/stock/report" element={<ProductReport />} />
            <Route path="/vendor-product" element={<VendorProduct />} />
            <Route path="/request-list" element={<RequestedItems />} />
            <Route path="/track-inventory" element={<TrackDelivery />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/sales-reports" element={<SalesReports />} />
            <Route path="/delivery-reports" element={<DeliveryReport />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/userinvitations" element={<Invitations />} />
            
              <Route path="/customer" element={<Customer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/billing-info" element={<BillingInfo />} />
              <Route path="/view-Stock" element={<ViewStock />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/customer-reports" element={<CustomerReports />} />
              
          </Routes>
        </div>
     
      </div>
    </Router>
  );
}

export default App;