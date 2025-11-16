// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import EditRecipeForm from './components/EditRecipeForm';
import SearchBar from './components/SearchBar';
import useRecipeStore from './components/recipeStore';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import FavoriteButton from './components/FavoriteButton';

function App() {
  const setRecipes = useRecipeStore((s) => s.setRecipes);

  // optional initial sample data
  useEffect(() => {
    setRecipes([
      { id: 1, title: 'Spicy Tomato Pasta', description: 'Tomato, garlic, chili flakes, olive oil', createdAt: new Date().toISOString() },
      { id: 2, title: 'Avocado Toast', description: 'Sourdough, ripe avocado, lemon, salt', createdAt: new Date().toISOString() },
    ]);
  }, [setRecipes]);

  return (
    <Router>
      <div style={{ maxWidth: 900, margin: '36px auto', padding: 16 }}>
        <h1>Recipe Sharing App</h1>

        <Routes>
          <Route path="/" element={
            <>
              <section style={{ marginTop: 8 }}>
                <h2>Add Recipe</h2>
                <AddRecipeForm />
              </section>

              <section style={{ marginTop: 20 }}>
                <h2>Search Recipes</h2>
                <SearchBar />
                <RecipeList />
              </section>

              <section style={{ marginTop: 20 }}>
                <FavoritesList />
              </section>

              <section style={{ marginTop: 20 }}>
                <RecommendationsList />
              </section>

              
            </>
          } />

          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/edit/:id" element={<EditRecipeForm />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
