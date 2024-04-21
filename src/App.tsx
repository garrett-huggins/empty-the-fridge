import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [response, setResponse] = React.useState();

  const handleFormSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default form submission behavior

    const formData = new FormData(event.target); // Get form data
    try {
      const response = await fetch("http://0.0.0.0:5000/analyze", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseData = await response.json(); // Parse response data as JSON
      setResponse(responseData); // Update state with response data
      console.log("Response data:", responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form onSubmit={handleFormSubmit}>
          <input
            name="image"
            accept="image/*"
            id="icon-button-file"
            type="file"
            capture="environment"
          />
          <label htmlFor="icon-button-file">
            <button type="submit">Upload Image</button>
          </label>
        </form>
        <p>{JSON.stringify(response)}</p>
      </header>
    </div>
  );
}

export default App;
