import React from "react";
import ProductsContainer from "../components/ProductsContainer";
import MenuDesplegable from "../components/MenuDesplegable";
import MainHome from "../components/MainHome";
import Navbar from "./Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <MainHome />
      <MenuDesplegable />
      <ProductsContainer />
    </div>
  );
}
