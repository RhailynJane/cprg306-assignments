"use client";
import { useEffect, useState } from "react";

async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Failed to fetch meal ideas:", error);
    return [];
  }
}

async function fetchMealDetails(id) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const data = await response.json();
    return data.meals?.[0] || null;
  } catch (error) {
    console.error("Failed to fetch meal details:", error);
    return null;
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    if (!ingredient) return;

    async function loadIdeas() {
      setSelectedMeal(null); // reset selected meal
      const result = await fetchMealIdeas(ingredient);
      setMeals(result);
    }

    loadIdeas();
  }, [ingredient]);

  const handleMealClick = async (idMeal) => {
    setLoadingDetails(true);
    const meal = await fetchMealDetails(idMeal);
    setSelectedMeal(meal);
    setLoadingDetails(false);
  };

  const getIngredientsList = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-black">
        Meal Ideas for <span className="text-blue-600">{ingredient}</span>
      </h2>

      {meals.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="border p-2 rounded shadow cursor-pointer hover:bg-gray-100"
              onClick={() => handleMealClick(meal.idMeal)}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-40 object-cover rounded"
              />
              <p className="mt-2 text-center text-black font-medium">
                {meal.strMeal}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No meal ideas found.</p>
      )}

      {loadingDetails && (
        <p className="mt-4 text-blue-500">Loading details...</p>
      )}

      {selectedMeal && (
        <div className="mt-6 border-t pt-4">
          <h3 className="text-xl font-bold text-black mb-2">
            Ingredients for {selectedMeal.strMeal}
          </h3>
          <ul className="list-disc list-inside text-black">
            {getIngredientsList(selectedMeal).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
