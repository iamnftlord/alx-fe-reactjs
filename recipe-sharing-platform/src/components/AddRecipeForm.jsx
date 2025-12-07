import React, { useState, useEffect } from "react";

export default function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredientsText, setIngredientsText] = useState("");
  const [instructionsText, setInstructionsText] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Validate fields and return an object of errors
  function validate() {
    const errs = {};
    if (!title.trim()) errs.title = "Title is required.";
    // split by newline OR comma, trim and remove blanks
    const ingredients = ingredientsText
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (ingredients.length < 2) errs.ingredients = "Add at least 2 ingredients.";
    const instructions = instructionsText
      .split(/\n/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (instructions.length < 1) errs.instructions = "Add at least 1 step.";
    return { errs, ingredients, instructions };
  }

  useEffect(() => {
    // live validate
    const { errs } = validate();
    setErrors(errs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, ingredientsText, instructionsText]);

  function handleSubmit(e) {
    e.preventDefault();
    const { errs, ingredients, instructions } = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);

    // Build minimal recipe object. Image can be optional or a placeholder.
    const newRecipe = {
      // id should be provided by parent (or you can use timestamp)
      id: Date.now(),
      title: title.trim(),
      summary: instructions.slice(0, 2).join(" ").slice(0, 120), // short summary
      image: "/images/placeholder.jpg", // replace with actual upload later
      ingredients,
      instructions,
    };

    // pass to parent
    onAddRecipe(newRecipe);

    // reset
    setTitle("");
    setIngredientsText("");
    setInstructionsText("");
    setSubmitting(false);
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-red-200 rounded-2xl shadow-md"
      aria-label="Add recipe form"
    >
      <h2 className="text-2xl font-bold mb-4">Add a new recipe</h2>

      <label className="block mb-4">
        <span className="text-sm font-medium">Title</span>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2"
          placeholder="e.g. Easy Tomato Pasta"
          aria-invalid={!!errors.title}
        />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </label>

      <label className="block mb-4">
        <span className="text-sm font-medium">Ingredients</span>
        <small className="block text-xs text-gray-500">Separate by new line or commas. Minimum 2.</small>
        <textarea
          value={ingredientsText}
          onChange={(e) => setIngredientsText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 min-h-[90px]"
          placeholder="e.g. 200g spaghetti
2 tomatoes
1 clove garlic"
          aria-invalid={!!errors.ingredients}
        />
        {errors.ingredients && <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>}
      </label>

      <label className="block mb-4">
        <span className="text-sm font-medium">Preparation steps</span>
        <small className="block text-xs text-gray-500">Write each step on a new line.</small>
        <textarea
          value={instructionsText}
          onChange={(e) => setInstructionsText(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-200 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 min-h-[120px]"
          placeholder="Step 1: ...
Step 2: ..."
          aria-invalid={!!errors.instructions}
        />
        {errors.instructions && <p className="text-red-600 text-sm mt-1">{errors.instructions}</p>}
      </label>

      <div className="flex items-center justify-between gap-4 mt-6">
        <button
          type="submit"
          disabled={hasErrors || submitting}
          className={`inline-flex items-center px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            hasErrors || submitting
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700 shadow"
          }`}
        >
          {submitting ? "Adding..." : "Add recipe"}
        </button>

        <p className="text-sm text-gray-500">Make sure all fields are filled correctly.</p>
      </div>
    </form>
  );
}
