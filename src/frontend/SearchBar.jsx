import React, { useState , useCallback } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = useCallback(
    debounce(async (text) => {
      if (!text) return setSuggestions([]);
      try {
        console.log("trying to send the get request to search endpoint")
        const res = await axios.get('/api/search', {
            params: { query: text },
            withCredentials: true,
          });
        setSuggestions(res.data);
      } catch (err) {
        console.error(err);
      }
    }, 300), // waits 300ms
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
    <div className="relative">
      <input
        type="text"
        placeholder="Search securities..."
        value={query}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
      {suggestions.length > 0 && (
  <div className="absolute bg-white border mt-1 w-full z-10 max-h-60 overflow-y-auto shadow-lg rounded">
    {suggestions.map((s, i) => (
      <div
        key={i}
        onClick={() => handleSelect(s.symbol)}
        className="p-2 hover:bg-gray-200 cursor-pointer border-b last:border-b-0"
      >
        {s.symbol} - {s.name}
      </div>
    ))}
  </div>
)}
  </div>
)}
   