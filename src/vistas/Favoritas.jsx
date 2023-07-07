import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import CardProductFavorita from "../components/CardProductFavorita";
export default function Favoritas() {
  const { cardFavoritas } = useContext(StoreContext);
  return (
    <div>
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
      <Link to="/">
        <p>Ir al home</p>
      </Link>
    </div>
  );
}
