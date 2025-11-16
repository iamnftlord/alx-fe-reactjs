import React, { useState } from 'react';
import useRecipeStore from '../stores/recipeStore';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert('Please enter a title');

    const newRecipe = {
      id: Date.now(), // simple id for demo; in real app use uuid
      title: title.trim(),
      description: description.trim(),
      createdAt: new Date().toISOString(),
    };

    addRecipe(newRecipe);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '12px' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe title"
        style={{ display: 'block', width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 8 }}
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Short description / ingredients / steps"
        rows={4}
        style={{ display: 'block', width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #e5e7eb', marginBottom: 8 }}
      />
      <button type="submit" style={{ padding: '10px 14px', borderRadius: 8, background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer' }}>
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
