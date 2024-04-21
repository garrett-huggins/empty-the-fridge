import React from "react";
import StepLoader from "../component/StepLoader";
import Loading from "../component/Loading";

const API_URL = "https://af57-131-123-52-40.ngrok-free.app";

interface Response {
  contents: string[];
}

export default function List() {
  const [step, setStep] = React.useState<number>(0);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const [response, setResponse] = React.useState<Response>();
  const [loading, setLoading] = React.useState(false);

  const handleFormSubmit = async (event: any) => {
    setLoading(true); // Set loading state to true
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
      handleNextStep();
      handleRecipeGenerate(responseData); // Call handleRecipeGenerate function with response data as argument
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading state to false
    }
  };

  const handleRecipeGenerate = async (res: any) => {
    try {
      const response = await fetch(`${API_URL}/ingredent2recipe`, {
        method: "POST",
        body: JSON.stringify(res),
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
      handleNextStep();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

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
              onSubmit={handleFormSubmit}
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
                />
              </label>
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 py-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
              >
                Submit
              </button>
            </form>
          </div>
        )}
        {/* list ingredients */}
        {step === 1 && (
          <div className="mt-20">
            <Loading />
          </div>
        )}
        {/* generate recipes */}
        {step === 2 && response && (
          <div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Here are some recipes you can make
            </h1>
            <ul>{JSON.stringify(response)}</ul>
          </div>
        )}
      </div>
    </div>
  );
}
