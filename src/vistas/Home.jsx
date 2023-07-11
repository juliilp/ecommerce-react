import React from "react";
import ProductsContainer from "../components/ProductsContainer";
import MainHome from "../components/MainHome";
import SinProductos from "../components/SinProductos";

export default function Home() {
  return (
    <main className="font-poppins">
      {/* <MainHome /> */}
      <ProductsContainer />
      <SinProductos />
    </main>
  );
}
