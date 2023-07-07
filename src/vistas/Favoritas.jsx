import React from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
export default function Favoritas() {
  const { cardFavoritas } = useContext(StoreContext);
  return (
    <div>
      {cardFavoritas ? (
        cardFavoritas.map((card) => <p>{card.id}</p>)
      ) : (
        <p>No tenes card favoritas!</p>
      )}
      <Link to="/">
        <p>Ir al home</p>
      </Link>
    </div>
  );
}
