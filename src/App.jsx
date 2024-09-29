import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@pages/Main";
import PostPage from "@pages/Post";
import PrivatePostPage from "@pages/PrivatePost";
import GroupRegisterPage from "@pages/GroupRegister";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/feed" element={<PostPage />} />
        <Route path="/private" element={<PrivatePostPage />} />
        <Route path="/register" element={<GroupRegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
