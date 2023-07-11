import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { motion, AnimatePresence } from "framer-motion";
export default function SinProductos() {
  const { allProductRender, productosCreados } = useContext(StoreContext);
  let render = allProductRender.filter((p) => p.visible === "true");

  return (
    <section className="flex w-full h-full justify-center items-center">
      <AnimatePresence>
        {render &&
          render.length === 0 &&
          productosCreados &&
          productosCreados.length === 0 && (
            <motion.p
              className="text-2xl font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No products match the name you entered
            </motion.p>
          )}
      </AnimatePresence>
    </section>
  );
}
