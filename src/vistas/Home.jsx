import React from "react";
import ProductsContainer from "../components/ProductsContainer";
import MainHome from "../components/MainHome";
import SinProductos from "../components/SinProductos";
import { motion } from "framer-motion";
export default function Home() {
  return (
    <motion.main
      className="font-poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* <MainHome /> */}
      <ProductsContainer />
      <SinProductos />
    </motion.main>
  );
}
