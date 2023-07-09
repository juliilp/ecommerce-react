import React from "react";
import ProductsContainer from "../components/ProductsContainer";
import MainHome from "../components/MainHome";

export default function Home() {
  return (
    <main className="font-poppins">
      <MainHome />
      <ProductsContainer />
    </main>
  );
}
