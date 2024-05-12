
import './App.css';
import Dashboard from "./Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import VendorProduct from "./pages/vendor/vendorProduct";
import RequestedItems from './pages/vendor/RequestedItems/RequestedItems';
import TrackDelivery from './pages/vendor/TrackDelivery/TrackDelivery';
import Invoice from './pages/vendor/Invoice/Invoice';
import SalesReports from './pages/vendor/Reports/SalesReports';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/vendor-product" element={<VendorProduct />} />
          <Route path="/request-list" element={<RequestedItems />} />
          <Route path="/track-inventory" element={<TrackDelivery />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/sales-reports" element={<SalesReports />} />
        </Routes>
      </div>
  </Router>
  );
}

export default App;
