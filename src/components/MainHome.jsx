import { useContext, useState } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
export default function MainHome() {
  // const { handlerMenu } = useContext(StoreContext);
  return (
    <main className="w-full px-16">
      <Link to="/dashboard">Dashboar</Link>
    </main>
  );
}
