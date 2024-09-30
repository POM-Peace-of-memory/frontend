import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@pages/Main";
import PostPage from "@pages/Post";
import PrivatePostPage from "@pages/PrivatePost";
import PostDetailPage from "@pages/PostDetail";
import GroupRegisterPage from "@pages/GroupRegister";
import GroupPage from "./pages/Group";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/feed" element={<PostPage />} />
        <Route path="/private" element={<PrivatePostPage />} />
        <Route path="/detail" element={<PostDetailPage />} />
        <Route path="/register" element={<GroupRegisterPage />} />
        <Route path="/group" element={<GroupPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
