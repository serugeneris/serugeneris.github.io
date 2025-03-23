// components/search.js
import { useState } from 'react';

export default function Search({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      <style jsx>{`
        .search-container {
          width: 100%;
          margin-bottom: 2rem;
        }
        
        .search-input {
          width: 70%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px 0 0 4px;
          font-size: 0.9rem;
          outline: none;
        }
        
        .search-button {
          width: 30%;
          padding: 0.5rem;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 0 4px 4px 0;
          font-size: 0.9rem;
          cursor: pointer;
        }
        
        .search-button:hover {
          background-color: #555;
        }
        
        @media (max-width: 768px) {
          .search-input, .search-button {
            width: 100%;
            border-radius: 4px;
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}