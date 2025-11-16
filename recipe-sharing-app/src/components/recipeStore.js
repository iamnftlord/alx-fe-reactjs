// src/components/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  // core data
  recipes: [],

  // search + filtered results
  searchTerm: '',
  filteredRecipes: [],

  // set the entire recipes array (e.g., initial data)
  setRecipes: (recipes) =>
    set((state) => {
      const term = state.searchTerm || '';
      const filtered = recipes.filter((r) =>
        (r.title || '').toLowerCase().includes(term.toLowerCase())
        || (r.description || r.instructions || '').toLowerCase().includes(term.toLowerCase())
      );
      return { recipes, filteredRecipes: filtered };
    }),

  // add, update, delete
  addRecipe: (recipe) =>
    set((state) => {
      const newRecipes = [...state.recipes, recipe];
      const term = state.searchTerm || '';
      const filtered = newRecipes.filter((r) =>
        (r.title || '').toLowerCase().includes(term.toLowerCase())
        || (r.description || r.instructions || '').toLowerCase().includes(term.toLowerCase())
      );
      return { recipes: newRecipes, filteredRecipes: filtered };
    }),

  updateRecipe: (updated) =>
    set((state) => {
      const newRecipes = state.recipes.map((r) => (r.id === updated.id ? { ...r, ...updated } : r));
      const term = state.searchTerm || '';
      const filtered = newRecipes.filter((r) =>
        (r.title || '').toLowerCase().includes(term.toLowerCase())
        || (r.description || r.instructions || '').toLowerCase().includes(term.toLowerCase())
      );
      return { recipes: newRecipes, filteredRecipes: filtered };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const newRecipes = state.recipes.filter((r) => r.id !== id);
      const term = state.searchTerm || '';
      const filtered = newRecipes.filter((r) =>
        (r.title || '').toLowerCase().includes(term.toLowerCase())
        || (r.description || r.instructions || '').toLowerCase().includes(term.toLowerCase())
      );
      return { recipes: newRecipes, filteredRecipes: filtered };
    }),

  // explicit filter action (recompute filteredRecipes from current recipes + searchTerm)
  filterRecipes: () =>
    set((state) => {
      const term = state.searchTerm || '';
      const filtered = state.recipes.filter((r) =>
        (r.title || '').toLowerCase().includes(term.toLowerCase())
        || (r.description || r.instructions || '').toLowerCase().includes(term.toLowerCase())
      );
      return { filteredRecipes: filtered };
    }),

  // set search term and auto-filter
  setSearchTerm: (term) =>
    set((state) => {
      const lc = (term || '').toLowerCase();
      const filtered = state.recipes.filter((r) =>
        (r.title || '').toLowerCase().includes(lc)
        || (r.description || r.instructions || '').toLowerCase().includes(lc)
      );
      return { searchTerm: term, filteredRecipes: filtered };
    }),

  // convenience getter
  getFilteredRecipes: () => get().filteredRecipes,
}));

export default useRecipeStore;
