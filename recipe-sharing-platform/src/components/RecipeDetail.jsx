import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data.json';



export default function RecipeDetail() {
  const { id } = useParams();
  const recipe = data.find(r => String(r.id) === String(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!recipe) {
    return (
      <main className="p-6">
        <p>
          Recipe not found.{" "}
          <Link to="/" className="text-indigo-600">Back to home</Link>
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg bg-white">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <h1 className="text-2xl font-bold">{recipe.title}</h1>

      <p className="mt-4 text-gray-700">{recipe.summary}</p>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
        <ul className="list-disc pl-5 text-gray-700">
          {recipe.ingredients?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Instructions</h2>
        <ol className="list-decimal pl-5 text-gray-700">
          {recipe.instructions?.map((step, index) => (
            <li key={index} className="mb-2">{step}</li>
          ))}
        </ol>
      </section>

      <div className="mt-6">
        <Link to="/" className="text-indigo-600">← Back to recipes</Link>
      </div>
    </main>
  );
}
