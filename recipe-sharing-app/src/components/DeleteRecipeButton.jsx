// src/components/DeleteRecipeButton.jsx
import React from 'react';
import useRecipeStore from './recipeStore';
import { useNavigate } from 'react-router-dom';

const DeleteRecipeButton = ({ recipeId, afterDelete }) => {
  const deleteRecipe = useRecipeStore((s) => s.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    const ok = window.confirm('Delete this recipe?');
    if (!ok) return;
    deleteRecipe(recipeId);
    if (afterDelete) afterDelete();
    else navigate('/');
  };

  return (
    <button onClick={handleDelete} style={{ padding: '8px 12px', background: '#fee2e2', borderRadius: 6, border: 'none', cursor: 'pointer' }}>
      Delete
    </button>
  );
};

export default DeleteRecipeButton;
