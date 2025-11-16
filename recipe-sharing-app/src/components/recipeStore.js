// src/components/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],

  // initialize or replace the recipes array
  setRecipes: (recipes) => set({ recipes }),

  // add a new recipe
  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),

  // update an existing recipe (by id)
  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)),
    })),

  // delete a recipe by id
  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  // helper: get recipe by id (not strictly required, but convenient)
  getRecipeById: (id) => get().recipes.find((r) => r.id === id) || null,
}));

export default useRecipeStore;
