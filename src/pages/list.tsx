import React from "react";
import StepLoader from "../component/StepLoader";
import Loading from "../component/Loading";
import RecipeCard from "../component/RecipeCard";
import { useRef } from "react";

const API_URL = "https://f5dc-150-134-245-2.ngrok-free.app";

interface Content {
  title: string;
  ingredients: string[];
  steps: string[];
}

interface Response {
  content: Content[];
}

export default function List() {
  const [step, setStep] = React.useState<number>(0);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const [response, setResponse] = React.useState<Response>();

  const handleFormSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    let headers = new Headers();

    headers.append("Access-Control-Allow-Origin", API_URL);
    headers.append("Access-Control-Allow-Credentials", "true");

    const formData = new FormData(event.target); // Get form data
    try {
      const response = await fetch(`${API_URL}/image2ingredient`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json(); // Parse response data as JSON
      console.log("Response data:", responseData);
      handleRecipeGenerate(responseData); // Call handleRecipeGenerate function with response data as argument
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleRecipeGenerate = async (res: any) => {
    setStep(2); // Set step state to 2
    try {
      const response = await fetch(`${API_URL}/ingredient2recipe`, {
        method: "POST",
        body: JSON.stringify({ ingredients: res }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json(); // Parse response data as JSON
      console.log("Response data:", responseData);
      setResponse(responseData); // Set response state with response data
      setStep(3);
    } catch (error) {
      console.error("Error fetching data:", error);
      setStep(3); // Set step state to 3
    }
  };

  return (
    <div>
      <StepLoader state={step} />
      <div className="flex flex-col min-h-[100dvh-1.5rem] items-center justify-center">
        {/* take photo of fridge */}
        {step === 0 && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Take a photo of your fridge
            </h1>
            <form
              onSubmit={(event) => {
                setStep(1);
                handleFormSubmit(event);
              }}
              className="flex flex-col justify-center items-center space-y-4"
            >
              <label htmlFor="icon-button-file">
                <p className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 py-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50">
                  Open Camera
                </p>
                <input
                  className="hidden"
                  name="image"
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  capture="environment"
                  onChange={() => submitButtonRef.current?.click()}
                />
              </label>
              <button
                ref={submitButtonRef}
                type="submit"
                className="hidden h-10 items-center justify-center rounded-md bg-gray-900 px-8 py-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {/* analyzing ingredients */}
        {step === 1 && (
          <div className="mt-20">
            <Loading />
          </div>
        )}
        {/* generating recipes */}
        {step === 2 && (
          <div className="mt-20">
            <Loading />
          </div>
        )}
        {/* recipes */}
        {step === 3 && (
          <div>
            <h1 className="text-3xl px-4 font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Here are some recipes you can make
            </h1>
            <ul>
              {response?.content.map((content) => (
                <RecipeCard
                  title={content.title}
                  ingredients={content.ingredients}
                  instructions={content.steps}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// {response?.content.map((content) => (
//   <RecipeCard
//     title={content.title}
//     ingredients={content.ingredients}
//     instructions={content.steps}
//   />
// ))}
