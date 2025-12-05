import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import data from '../data.json';

export default function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(data);
  }, []);

  return (
    <main className="max-w-7xl mx-auto p-4 sm:p-6">
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Recipe Share</h1>
        <p className="text-gray-600 mt-2">Explore delicious recipes shared by the community.</p>
      </header>

      <section>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {recipes.map((r) => (
            <div
              key={r.id}
              className="rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-200"
            >
              <RecipeCard recipe={r} />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
