import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './pages/sidebar';
import './App.css';
import Home from './pages/Home';
import Conversations from './pages/Conversations';


function App() {
  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <div className="w-64 flex-shrink-0 bg-gray-900 text-white">
      <Sidebar />
     
    </div>
        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/conversations" element={<Conversations />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;



