import React from "react";

interface params {
  title: string;
  ingredients: Array<string>;
  instructions: Array<string>;
}

function RecipeCard({ title, ingredients, instructions }: params) {
  return (
    <div className="w-full flex justify-center">
      <div className="block max-w-sm w-72 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 px-6 py-8 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white ">
          {title}
        </h5>
        <h5 className="font-normal text-gray-700 dark:text-white mt-4">
          Ingredients
        </h5>
        {ingredients.map((value, id) => (
          <li className="text-white">{value}</li>
        ))}
        <h5 className="font-normal text-gray-700 dark:text-white mt-4">
          Instructions
        </h5>
        {instructions.map((value, id) => (
          <li className="text-white">{value}</li>
        ))}
      </div>
    </div>
  );
}

export default RecipeCard;
