import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "@pages/Main";
import PostPage from "@pages/Post";
import PrivatePage from "@pages/Private";
import PostDetailPage from "@pages/PostDetail";
import GroupRegisterPage from "@pages/GroupRegister";
import GroupPage from "@pages/Group";
import GroupListPage from "@pages/GroupList";
import NotFoundPage from "@pages/NotFound";
import ScrollToTop from "@components/all/ScrollToTop";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="groups">
          <Route index element={<GroupListPage />} />
          <Route path=":groupId" element={<GroupPage />} />
          <Route
            path=":groupId/private"
            element={<PrivatePage variant={"groups"} />}
          />
          <Route path="register" element={<GroupRegisterPage />} />
        </Route>
        <Route path="/feed" element={<PostPage />} />
        <Route path="/private" element={<PrivatePage />} />
        <Route path="/posts/:postId" element={<PostDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
