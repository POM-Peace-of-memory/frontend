import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@pages/Main";
import PostPage from "@pages/Post";
import PrivatePostPage from "@pages/PrivatePost";
import PostDetailPage from "@pages/PostDetail";
import GroupRegisterPage from "@pages/GroupRegister";
import GroupPage from "@pages/Group";
import GroupListPage from "@pages/GroupList";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="groups">
          <Route index element={<GroupListPage />} />
          <Route path="detail" element={<GroupPage />} />
          <Route path="register" element={<GroupRegisterPage />} />
        </Route>
        <Route path="/feed" element={<PostPage />} />
        <Route path="/private" element={<PrivatePostPage />} />
        <Route path="/detail" element={<PostDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
