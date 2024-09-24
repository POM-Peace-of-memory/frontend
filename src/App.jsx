import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@pages/Main";
import PostPage from "@pages/Post";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/feed" element={<PostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
