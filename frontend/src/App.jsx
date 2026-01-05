import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import {
  Recipes,
  Home,
  Login,
  Register,
  Profile,
  CreateArticle,
} from "./pages";
import ArticleDetail from "./pages/recipes/id";
import EditArticlePage from "./pages/recipes/id/edit";
import { Navbar, Footer } from "./components";

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/publish" element={<CreateArticle />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/recipes/:id" element={<ArticleDetail />} />
          <Route path="/recipes/:id/edit" element={<EditArticlePage />} />
          <Route path="*" cta element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
