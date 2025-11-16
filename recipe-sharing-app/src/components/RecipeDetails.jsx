// src/components/RecipeDetails.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import DeleteRecipeButton from './DeleteRecipeButton';

const RecipeDetails = () => {
  const { id } = useParams();            // id comes from route
  const recipeId = Number(id) || id;     // keep numeric or string ids compatible
  const getRecipeById = useRecipeStore((s) => s.getRecipeById);
  const recipe = getRecipeById(recipeId);
  const navigate = useNavigate();

  if (!recipe) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Recipe not found</h2>
        <button onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>Go back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>{recipe.title}</h1>
      <p>{recipe.description || recipe.instructions}</p>

      {/* optional fields */}
      {recipe.createdAt && <p><small>Created: {new Date(recipe.createdAt).toLocaleString()}</small></p>}
      {recipe.tags && <p>Tags: {recipe.tags.join(', ')}</p>}

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <Link to={`/edit/${recipeId}`} style={{ padding: '8px 12px', background: '#f3f4f6', borderRadius: 6, textDecoration: 'none' }}>
          Edit
        </Link>

        <DeleteRecipeButton recipeId={recipeId} afterDelete={() => navigate('/')} />
      </div>
    </div>
  );
};

export default RecipeDetails;
