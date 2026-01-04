import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import {
  About,
  Recipes,
  Home,
  Login,
  Register,
  Profile,
  CreateArticle,
} from "./pages";
import { Navbar } from "./components";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/publish" element={<CreateArticle />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" cta element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
