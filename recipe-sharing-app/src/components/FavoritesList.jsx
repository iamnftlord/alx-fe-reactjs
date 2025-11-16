// src/components/FavoritesList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton';

const FavoritesList = () => {
  const favorites = useRecipeStore((s) => s.getFavoriteRecipes)(); // returns array of recipe objects

  if (!favorites || favorites.length === 0) {
    return <div style={{ padding: 12 }}><em>No favorites yet. Mark recipes as favorite to see them here.</em></div>;
  }

  return (
    <div style={{ padding: 12 }}>
      <h2>My Favorites</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {favorites.map((r) => (
          <li key={r.id} style={{ borderBottom: '1px solid #e6e6e6', padding: '10px 0' }}>
            <h3 style={{ margin: 0 }}>
              <Link to={`/recipes/${r.id}`} style={{ textDecoration: 'none', color: '#111827' }}>{r.title}</Link>
            </h3>
            <p style={{ margin: '6px 0' }}>{(r.description || r.instructions || '').slice(0, 120)}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <FavoriteButton recipeId={r.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoritesList;
