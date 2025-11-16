// src/components/SearchBar.jsx
import React from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

  return (
    <div style={{ marginBottom: 12 }}>
      <input
        type="text"
        placeholder="Search recipes by title, ingredient or description..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #e5e7eb',
          boxSizing: 'border-box'
        }}
      />
    </div>
  );
};

export default SearchBar;
