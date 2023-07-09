import React, { useEffect, useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import CardProducts from "./CardProducts";

export default function ProductsContainer() {
  const { allProductRender } = useContext(StoreContext);

  // Si no anda, le tengo que poner el true en string o booleano
  const render = allProductRender.filter((p) => p.visible === true);
  console.log(allProductRender);
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:justify-self-center">
      {render.map((producto, key) => (
        <CardProducts
          image={producto.image}
          title={producto.title}
          price={producto.price}
          category={producto.category}
          id={producto.id}
          key={key}
          producto={producto}
        />
      ))}
    </section>
  );
}
