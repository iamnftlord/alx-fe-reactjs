import React from 'react';
import useRecipeStore from '../stores/recipeStore';


const RecipeList = () => {
  // select only the recipes slice to avoid unnecessary re-renders
  const recipes = useRecipeStore((state) => state.recipes);
  const removeRecipe = useRecipeStore((s) => s.removeRecipe);

  if (!recipes || recipes.length === 0) {
    return <div><em>No recipes yet — add one below!</em></div>;
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id} style={{ borderBottom: '1px solid #e6e6e6', padding: '12px 0' }}>
          <h3 style={{ marginBottom: '6px' }}>{recipe.title}</h3>
          <p style={{ marginTop: 0 }}>{recipe.description}</p>
          <div style={{ marginTop: '8px' }}>
            <button
              onClick={() => removeRecipe(recipe.id)}
              style={{ padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
