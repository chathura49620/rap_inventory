import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Stock from "./pages/stock/Stock";
import RequestProduct from "./pages/stock/RequestProduct";
import ProductReport from "./pages/stock/ProductReport";
import Sidebar from "./pages/common/Sidebar";


function App() {
  return (
    <Router>
      <div>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/stock" element={<Stock />} />
            <Route path="/request-products" element={<RequestProduct />} />
            <Route path="/stock/report" element={<ProductReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;