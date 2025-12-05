import React from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data.json';

export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = data.find(r => String(r.id) === String(id));

  if (!recipe) return (
    <main className="p-6">
      <p>Recipe not found. <Link to="/" className="text-indigo-600">Back to home</Link></p>
    </main>
  );

  return (
    <main className="max-w-3xl mx-auto p-6">
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6" />
      <h1 className="text-2xl font-bold">{recipe.title}</h1>
      <p className="mt-4 text-gray-700">{recipe.summary}</p>
      <div className="mt-6">
        <Link to="/" className="text-indigo-600">← Back to recipes</Link>
      </div>
    </main>
  );
}
