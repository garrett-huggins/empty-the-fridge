interface params {
  title: string;
  ingredients: Array<string>;
  instructions: Array<string>;
}

function RecipeCard({ title, ingredients, instructions }: params) {
  return (
    <div className="w-full flex justify-center mt-6 px-6">
      <div className="block w-full space-y-2 bg-white border p-6 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
        <h5 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white ">
          {title}
        </h5>
        <hr />
        <div className="space-y-3">
          <h5 className="font-semibold text-2xl text-gray-700 dark:text-white mt-4">
            Ingredients
          </h5>
          <ul className="space-y-2">
            {ingredients.map((value, id) => (
              <li className="text-white list-disc list-inside">{value}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          <h5 className="font-semibold text-2xl text-gray-700 dark:text-white mt-4">
            Instructions
          </h5>
          <ul className="space-y-2">
            {instructions.map((value, id) => (
              <li className="text-white">{value}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
