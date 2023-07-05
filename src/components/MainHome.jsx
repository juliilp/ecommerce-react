import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
export default function MainHome() {
  const { handlerMenu } = useContext(StoreContext);
  return (
    <main>
      <button onClick={handlerMenu}>Abrir y cerrar menu</button>
    </main>
  );
}
