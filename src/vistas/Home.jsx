import React from "react";
import ProductsContainer from "../components/ProductsContainer";
import MenuDesplegable from "../components/MenuDesplegable";
import MainHome from "../components/MainHome";

export default function Home() {
  return (
    <div>
      <MainHome />
      <MenuDesplegable />
      <ProductsContainer />
    </div>
  );
}