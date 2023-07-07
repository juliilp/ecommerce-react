import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./vistas/Home.jsx";
import ContextProvider from "./context/ContextProvider";
import Favoritas from "./vistas/Favoritas";
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favoritos" element={<Favoritas />} />
      </Routes>
    </BrowserRouter>
  </ContextProvider>
);
