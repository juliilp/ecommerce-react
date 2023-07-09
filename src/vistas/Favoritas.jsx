import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import CardProductFavorita from "../components/CardProductFavorita";
export default function Favoritas() {
  const { cardFavoritas } = useContext(StoreContext);
  return (
    <section className="font-poppins mt-[15vh] ">
      <h1 className="font-semibold text-center text-[20px] mb-12 md:text-[25px] xl:text-[30px]">
        ¡Bienvenido a tus favoritos!
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {cardFavoritas.length > 0 ? (
          cardFavoritas.map((card, key) => (
            <CardProductFavorita
              key={key}
              image={card.image}
              id={card.id}
              category={card.category}
              price={card.price}
              title={card.title}
              producto={card.producto}
            />
          ))
        ) : (
          <p>No tenes card favoritas!</p>
        )}
      </div>
    </section>
  );
}
