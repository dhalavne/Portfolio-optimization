import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import PortfolioUI from './PortfolioUI';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="heading">Portfolio Optimization App</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/portfolioUI" element={<PortfolioUI />} />
        </Routes>
      </div>
    </Router>
  );
}