// src/components/RecommendationsList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import FavoriteButton from './FavoriteButton';

const RecommendationsList = () => {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const generate = useRecipeStore((s) => s.generateRecommendations);

  return (
    <div style={{ padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Recommended for you</h2>
        <button onClick={generate} style={{ padding: '6px 10px', borderRadius: 6 }}>Refresh</button>
      </div>

      {(!recommendations || recommendations.length === 0) && <div><em>No recommendations yet. Mark favorites to get suggestions.</em></div>}

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {recommendations.map((r) => (
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

export default RecommendationsList;
