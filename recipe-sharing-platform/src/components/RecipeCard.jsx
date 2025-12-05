import React from 'react';
import { Link } from 'react-router-dom'; // optional - if you use react-router

export default function RecipeCard({ recipe }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition duration-200 ease-out overflow-hidden">
      <div className="h-44 sm:h-52 md:h-44 lg:h-48 overflow-hidden">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{recipe.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{recipe.summary}</p>
        {/* If using react-router */}
        <Link
          to={`/recipes/${recipe.id}`}
          className="inline-block text-sm font-medium text-indigo-600 hover:underline"
        >
          View recipe →
        </Link>
      </div>
    </article>
  );
}
