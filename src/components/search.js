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
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ingresá el texto..."
          className="search-input"
        />
        <button type="submit" className="search-button">Buscar</button>
      </form>

      <style jsx>{`
        .search-container {
          width: 100%;
          margin-bottom: 2rem;
        }

        .search-form {
          display: flex;
          flex-direction: column;
        }
        
        .search-input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 0.9rem;
          outline: none;
        }
        
        .search-button {
          width: 100%;
          padding: 0.5rem;
          background-color: #333;
          color: white;
          border: none;
          border-radius: 4px;
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