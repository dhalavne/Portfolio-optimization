import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate, Link } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default function Register() {
    const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('/register', { username, password });
      setErrorMessage('Registration successful!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setErrorMessage('Registration failed.');
    }
  };

  return (
    <div className="form-wrapper">
      <form className="form-container">
      <label htmlFor="name">Full Name:</label>
        <input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="button" onClick={handleRegister} className="btn-register">
          Register
        </button>

        <p className="register-link">
            Already have an account? <Link to="/">Login here</Link>
        </p>

        {errorMessage && <div className="message-box">{errorMessage}</div>}
      </form>
    </div>
  );
}