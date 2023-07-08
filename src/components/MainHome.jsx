import { useContext, useState } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import Carousel from "./Carousel";
export default function MainHome() {
  // const { handlerMenu } = useContext(StoreContext);
  return (
    <main className="w-full">
      <Link to="/dashboard">Dashboar</Link>
      <Carousel />
    </main>
  );
}
