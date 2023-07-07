import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./vistas/Home.jsx";
import ContextProvider from "./context/ContextProvider";
import Favoritas from "./vistas/Favoritas";
import Navbar from "./vistas/Navbar";
import Dashboard from "./vistas/Dashboard";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritas />} />
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
