import React, { useState, useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import './App.css';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(
    debounce(async (text) => {
      if (!text) return setSuggestions([]);
      try {
        const res = await axios.get('/api/search', {
          params: { query: text },
          withCredentials: true,
        });
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    fetchSuggestions(value);
  };

  const handleSelect = (symbol) => {
    onSelect(symbol);
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <div className="search-wrapper">
        <input
          type="text"
          placeholder="Search securities..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <div className="autocomplete-dropdown">
            {suggestions.map((s, i) => (
              <div
                key={i}
                onClick={() => handleSelect(s.symbol)}
                className="autocomplete-item"
              >
                <div className="symbol">{s.symbol}</div>
                <div className="name">{s.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
