import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './App.css';
import SearchBar from './SearchBar';

export default function App() {
  return (
    <Router>
      <div className="app-container">
        <h1 className="heading">Portfolio Optimization App</h1>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/searchBar" element={<SearchBar />} />
        </Routes>
      </div>
    </Router>
  );
}