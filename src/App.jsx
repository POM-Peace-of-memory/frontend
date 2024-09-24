import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@pages/Main";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
