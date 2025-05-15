import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './App.css';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      await axios.post('/login', { username, password });
      setErrorMessage('Login successful!');
      // Optionally redirect to a dashboard later
    } catch (err) {
      setErrorMessage('Login failed.');
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-container">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin} className="btn-login">
          Login
        </button>

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>

        {errorMessage && <div className="message-box">{errorMessage}</div>}
      </form>
    </div>
  );
}