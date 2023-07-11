import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
export default function SinProductos() {
  const { allProductRender, productosCreados } = useContext(StoreContext);
  let render = allProductRender.filter((p) => p.visible === "true");

  return (
    <section className="flex w-full h-full justify-center items-center">
      {render &&
        render.length === 0 &&
        productosCreados &&
        productosCreados.length === 0 && (
          <p className="text-2xl font-semibold">
            ¡Ningún producto coincide con el nombre de tu búsqueda!
          </p>
        )}
    </section>
  );
}
