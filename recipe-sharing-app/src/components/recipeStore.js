import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],

  // initialize the list (replace all recipes)
  setRecipes: (recipes) => set({ recipes }),

  // add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),

  // optional helpers
  removeRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)),
    })),
}));

export default useRecipeStore;
