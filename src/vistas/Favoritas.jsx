import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import CardProductFavorita from "../components/CardProductFavorita";
export default function Favoritas() {
  const { cardFavoritas } = useContext(StoreContext);
  console.log(cardFavoritas);
  return (
    <section className="font-poppins mt-[15vh] ">
      <h1 className="font-bold text-center text-5xl mb-12 md:text-[25px] xl:text-[30px]">
        ¡Welcome your favorites!
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
          <p className="text-2xl font-medium">¡No tenes card!</p>
        </div>
      )}
    </section>
  );
}
