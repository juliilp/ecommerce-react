import React, { useEffect, useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import CardProducts from "./CardProducts";

export default function ProductsContainer() {
  const {
    allProductRender,
    productosCreados,
    setProductosCreados,
    setAllProductCreados,
  } = useContext(StoreContext);

  // Si no anda, le tengo que poner el true en string o booleano
  let render = allProductRender.filter((p) => p.visible === "true");
  const dataLocalStorage = JSON.parse(localStorage.getItem("formData"));
  const renderLocalStorage =
    (dataLocalStorage &&
      dataLocalStorage.filter((p) => p.visible === "true")) ||
    [];
  const validacionProductos = [];

  useEffect(() => {
    setProductosCreados(renderLocalStorage);
    setAllProductCreados(renderLocalStorage);
  }, [setProductosCreados]);

  return (
    <section className="w-full h-full  mt-[15vh] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:px-32">
      {render.map((producto, key) =>
        !producto.create
          ? validacionProductos.push(producto) && (
              <CardProducts
                image={producto.image}
                title={producto.title}
                price={producto.price}
                category={producto.category}
                id={producto.id}
                key={key}
                producto={producto}
              />
            )
          : null
      )}
      {productosCreados &&
        productosCreados.map((producto, key) => {
          return (
            <CardProducts
              image={producto.image}
              title={producto.title}
              price={producto.price}
              category={producto.category && producto.category}
              id={producto.id}
              key={key}
              producto={producto}
            />
          );
        })}
    </section>
  );
}
