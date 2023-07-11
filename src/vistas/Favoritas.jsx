import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import CardProductFavorita from "../components/CardProductFavorita";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
export default function Favoritas() {
  const { cardFavoritas } = useContext(StoreContext);
  console.log(cardFavoritas);
  return (
    <motion.section
      className="font-poppins mt-[15vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.25 }}
    >
      <h1 className="font-bold text-center text-5xl mb-12 md:text-[25px] xl:text-[30px]">
        ¡Welcome to your favorites!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {cardFavoritas !== null &&
          cardFavoritas &&
          cardFavoritas.length > 0 &&
          cardFavoritas.map((card, key) => (
            <CardProductFavorita
              key={key}
              image={card.image ? card.image : null}
              id={card.id}
              category={card.category}
              price={card.price}
              title={card.title}
              producto={card.producto}
            />
          ))}
      </div>
      {cardFavoritas.length === 0 && (
        <div className="w-full h-full flex justify-center items-center ">
          <p className="text-2xl font-medium">
            You don't have any products in favorites
          </p>
        </div>
      )}
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 2500,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "orange",
              secondary: "black",
            },
          },
        }}
      />
    </motion.section>
  );
}
