import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import PortfolioResults from './components/PortfolioResults';
import './App.css'; // Use your styling here

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default function PortfolioForm() {
  const [selectedTickers, setSelectedTickers] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minReturn, setMinReturn] = useState('');
  const [maxRisk, setMaxRisk] = useState('');
  const [optimizerType, setOptimizerType] = useState('mean_variance');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTickerSelect = (symbol) => {
    if (!selectedTickers.includes(symbol)) {
      setSelectedTickers((prev) => [...prev, symbol]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTickers.length || !startDate || !endDate) return;

    try {
      setLoading(true);
      const response = await axios.post('/api/portfolio/stats', {
        tickers: selectedTickers,
        start_date: startDate,
        end_date: endDate,
        min_return: minReturn,
        max_risk: maxRisk,
        optimizer: optimizerType,
      });

      // Set stats including optimizer type for rendering
      setStats({ ...response.data, optimizer: optimizerType });
    } catch (err) {
      console.error(err);
      setStats({ error: 'Something went wrong while fetching results.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portfolio-form-container">
      <h2 className="form-title">Portfolio Optimization Configuration</h2>
      <form onSubmit={handleSubmit} className="portfolio-form">
        <div className="form-group">
          <label>Tickers</label>
          <SearchBar onSelect={handleTickerSelect} />
          <div className="ticker-list">
            {selectedTickers.map((t, i) => (
              <span key={i} className="ticker-chip">{t}</span>
            ))}
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Start Date</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>End Date</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>Minimum Return (%)</label>
            <input type="number" step="0.01" value={minReturn} onChange={(e) => setMinReturn(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Maximum Risk (%)</label>
            <input type="number" step="0.01" value={maxRisk} onChange={(e) => setMaxRisk(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label>Optimization Technique</label>
          <select value={optimizerType} onChange={(e) => setOptimizerType(e.target.value)}>
            <option value="mean_variance">Mean-Variance</option>
            <option value="black_litterman">Black-Litterman</option>
            {/* Add more here */}
          </select>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Calculating...' : 'Get Portfolio Stats'}
        </button>
      </form>

      {stats && <PortfolioResults stats={stats} />}
    </div>
  );
}
