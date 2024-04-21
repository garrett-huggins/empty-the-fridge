import { Route, BrowserRouter, Routes } from "react-router-dom";
import Home from "./pages/home";
import List from "./pages/list";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </BrowserRouter>
  );
}
