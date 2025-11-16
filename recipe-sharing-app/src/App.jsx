import React, { useEffect } from 'react';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import useRecipeStore from './stores/recipeStore';

function App() {
  const setRecipes = useRecipeStore((s) => s.setRecipes);

  // Optional: initialize with some demo recipes on mount
  useEffect(() => {
    setRecipes([
      { id: 1, title: 'Spicy Tomato Pasta', description: 'Tomato, garlic, chili flakes, olive oil' },
      { id: 2, title: 'Avocado Toast', description: 'Sourdough, ripe avocado, lemon, salt' },
    ]);
  }, [setRecipes]);

  return (
    <div className="container" style={{textAlign: 'center'}}>
      <h1>Recipe Sharing App</h1>

      <section style={{ marginTop: 20 }}>
        <h2>Add Recipe</h2>
        <AddRecipeForm />
      </section>

      <section style={{ marginTop: 28 }}>
        <h2>Recipes</h2>
        <RecipeList />
      </section>
    </div>
  );
}

export default App;
