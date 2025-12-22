import { Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import { About, Recipes, Home, Login, Register } from "./pages";
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" cta element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
