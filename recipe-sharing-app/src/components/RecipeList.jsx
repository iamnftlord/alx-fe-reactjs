// src/components/RecipeList.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);
  const filteredRecipes = useRecipeStore((s) => s.filteredRecipes);
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);

  // Choose which list to display: if user typed a search term, show filtered; otherwise show recipes
  const listToShow = searchTerm ? filteredRecipes : recipes;

  if (!listToShow || listToShow.length === 0) {
    return <div style={{ padding: 12 }}><em>No recipes found.</em></div>;
  }

  return (
    <div style={{ padding: 12 }}>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listToShow.map((r) => (
          <li key={r.id} style={{ borderBottom: '1px solid #e6e6e6', padding: '12px 0' }}>
            <h3 style={{ margin: 0 }}>
              <Link to={`/recipes/${r.id}`} style={{ textDecoration: 'none', color: '#111827' }}>{r.title}</Link>
            </h3>
            <p style={{ margin: '8px 0' }}>{(r.description || r.instructions || '').slice(0, 140)}{(r.description || r.instructions || '').length > 140 ? '…' : ''}</p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link to={`/edit/${r.id}`} style={{ padding: '6px 8px', background: '#f3f4f6', borderRadius: 6, textDecoration: 'none' }}>Edit</Link>
              <button onClick={() => {
                if (confirm('Delete this recipe?')) deleteRecipe(r.id);
              }} style={{ padding: '6px 8px', background: '#fee2e2', borderRadius: 6, cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
