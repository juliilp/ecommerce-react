import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
export default function MainHome() {
  const { handlerMenu, acumulador } = useContext(StoreContext);
  return (
    <main>
      <button onClick={handlerMenu}>Abrir y cerrar menu {acumulador}</button>
    </main>
  );
}
