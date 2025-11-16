// src/components/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  // core data
  recipes: [],
  // favorites: store recipe ids
  favorites: [],

  // recommendations (list of recipe objects)
  recommendations: [],

  // --- basic actions ---
  setRecipes: (recipes) => set({ recipes }),

  addRecipe: (recipe) =>
    set((state) => ({ recipes: [...state.recipes, recipe] })),

  updateRecipe: (updated) =>
    set((state) => ({
      recipes: state.recipes.map((r) => (r.id === updated.id ? { ...r, ...updated } : r)),
    })),

  deleteRecipe: (id) =>
    set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),

  // --- favorites actions ---
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites
        : [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  toggleFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.includes(recipeId)
        ? state.favorites.filter((id) => id !== recipeId)
        : [...state.favorites, recipeId],
    })),

  // --- helpers/selectors ---
  isFavorite: (recipeId) => get().favorites.includes(recipeId),

  getFavoriteRecipes: () =>
    get().recipes.filter((r) => get().favorites.includes(r.id)),

  // --- recommendations (simple mock algorithm) ---
  generateRecommendations: () =>
    set((state) => {
      // naive mock: recommend recipes that share words with favorite titles,
      // or pick random recipes not already favorited. Replace with real logic later.
      const favIds = new Set(state.favorites);
      const favTitles = state.recipes
        .filter((r) => favIds.has(r.id))
        .flatMap((r) => (r.title || '').toLowerCase().split(/\W+/));

      // score recipes by matching title words with favWords
      const scored = state.recipes
        .filter((r) => !favIds.has(r.id))
        .map((r) => {
          const titleWords = (r.title || '').toLowerCase().split(/\W+/);
          const score = titleWords.reduce((acc, w) => (acc + (favTitles.includes(w) ? 1 : 0)), 0);
          return { recipe: r, score };
        })
        .sort((a, b) => b.score - a.score);

      const recommended = scored.slice(0, 6).map((s) => s.recipe);
      return { recommendations: recommended };
    }),

  clearRecommendations: () => set({ recommendations: [] }),
}));

export default useRecipeStore;
