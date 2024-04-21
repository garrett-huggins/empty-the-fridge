import React from "react";

const API_URL = "https://2677-131-123-52-17.ngrok-free.app ";

export default function List() {
  const [step, setStep] = React.useState(0);
  const [fileUploaded, setFileUploaded] = React.useState();
  const hiddenFileInput = React.useRef(null);

  const handleNextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const handleClick = (event: any) => {
    if (hiddenFileInput.current) {
      // @ts-ignore
      hiddenFileInput.current.click();
    }
  };

  const handleChange = (event: any) => {
    console.log("File selected:", event.target.files[0]);
    setFileUploaded(event.target.files[0]);
  };

  const [response, setResponse] = React.useState();
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
      setResponse(responseData); // Update state with response data
      console.log("Response data:", responseData);
      setLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Set loading state to false
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col min-h-[100dvh] items-center justify-center">
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
            <button
              onClick={handleClick}
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 py-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
            >
              Open Camera
            </button>
            <input
              name="image"
              accept="image/*"
              id="icon-button-file"
              type="file"
              capture="environment"
            />
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
        <div className="flex flex-col items-center justify-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
            List ingredients
          </h1>
          {JSON.stringify(response)}
        </div>
      )}
    </div>
  );
}
