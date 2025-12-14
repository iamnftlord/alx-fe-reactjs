import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "./RecipeCard";
import AddRecipeForm from "./AddRecipeForm";
import data from "../data.json";

export default function HomePage() {
  const [recipes, setRecipes] = useState(() => {
    // load from localStorage if present, otherwise from data.json
    const saved = localStorage.getItem("recipes");
    return saved ? JSON.parse(saved) : data;
  });

  useEffect(() => {
    // persist changes
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  function handleAddRecipe(newRecipe) {
    // ensure id uniqueness: if you prefer a different strategy, replace this
    setRecipes((prev) => [newRecipe, ...prev]);
    // localStorage updated by effect
  }

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6 space-y-8">
      <header className="mb-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cyan-300">Recipe Share</h1>
        <p className="text-gray-600 mt-2 bg-center">Explore delicious recipes shared by the community.</p>
      </header>

      {/* Add recipe form */}
      <AddRecipeForm onAddRecipe={handleAddRecipe} />

      {/* Recipe grid */}
      <section>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((r) => (
            <Link key={r.id} to={`/recipe/${r.id}`} className="block">
              <RecipeCard recipe={r} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
