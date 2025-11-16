// src/components/FavoriteButton.jsx
import React from 'react';
import useRecipeStore from './recipeStore';

const FavoriteButton = ({ recipeId }) => {
  const isFavorite = useRecipeStore((s) => s.isFavorite)(recipeId); // call selector
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);
  const label = isFavorite ? '★ Remove favorite' : '☆ Add favorite';

  return (
    <button
      onClick={() => toggleFavorite(recipeId)}
      style={{
        padding: '6px 10px',
        borderRadius: 6,
        cursor: 'pointer',
        background: isFavorite ? '#fef3c7' : '#f3f4f6',
        border: 'none'
      }}
      aria-pressed={isFavorite}
    >
      {label}
    </button>
  );
};

export default FavoriteButton;
