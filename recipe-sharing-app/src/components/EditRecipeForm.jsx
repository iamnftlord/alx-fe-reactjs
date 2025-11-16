// src/components/EditRecipeForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const EditRecipeForm = () => {
  const { id } = useParams();
  const recipeId = Number(id) || id;
  const getRecipeById = useRecipeStore((s) => s.getRecipeById);
  const updateRecipe = useRecipeStore((s) => s.updateRecipe);
  const recipe = getRecipeById(recipeId);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title || '');
      setDescription(recipe.description || recipe.instructions || '');
    }
  }, [recipe]);

  if (!recipe) {
    return <div style={{ padding: 20 }}><p>Recipe not found.</p></div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Title required');

    updateRecipe({
      id: recipeId,
      title: title.trim(),
      description: description.trim(),
      // keep createdAt or other fields unchanged unless you want to update them
    });

    navigate(`/recipes/${recipeId}`); // go back to details
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Edit Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description / instructions"
          rows={6}
          style={{ display: 'block', width: '100%', marginBottom: 8, padding: 8 }}
        />
        <button type="submit" style={{ padding: '8px 12px', borderRadius: 6 }}>Save</button>
      </form>
    </div>
  );
};

export default EditRecipeForm;
