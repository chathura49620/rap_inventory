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

function App() {
  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/users" element={<Users />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/userinvitations" element={<Invitations />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;