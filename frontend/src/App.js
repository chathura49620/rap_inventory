import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <Router>
      <div>
        {/* Sidebar */}
        {/* <Sidebar /> */}

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;