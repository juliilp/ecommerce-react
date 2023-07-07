import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import CardProducts from "./CardProducts";
export default function ProductsContainer() {
  const { allProductRender } = useContext(StoreContext);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:justify-self-center">
      {allProductRender.map((producto, key) => {
        return (
          <CardProducts
            image={producto.image}
            title={producto.title}
            price={producto.price}
            category={producto.category}
            id={producto.id}
            key={key}
            producto={producto}
          />
        );
      })}
    </section>
  );
}
