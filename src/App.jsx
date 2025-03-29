import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './pages/sidebar';
import './App.css';
import Home from './pages/Home';
import  Dashboard from './pages/Dashboard';
import Test from './pages/Test';



function App() {
  return (
    <Router>
      
        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/test" element={<Test/>} />


          </Routes>
        </div>
      
    </Router>
  );
}

export default App;