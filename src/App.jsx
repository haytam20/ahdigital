import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './pages/sidebar';
import './App.css';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <div className="sidebar">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;