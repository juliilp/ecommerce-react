import { useContext, useState } from "react";
import { StoreContext } from "../context/ContextProvider";
export default function MainHome() {
  const { handlerMenu, acumulador, allProduct, setAllProductRender } =
    useContext(StoreContext);
  const [inputPrice, setInputPrice] = useState(0);
  const handlerInputRange = (e) => {
    setInputPrice(e.target.value);
    const filterCard = allProduct.filter((c) => c.price > inputPrice);
    setAllProductRender(filterCard);
  };
  return (
    <main>
      <button onClick={handlerMenu}>Abrir y cerrar menu {acumulador}</button>
      <input type="range" max={999} min={0} onChange={handlerInputRange} />
      <span>Price:{inputPrice}</span>
    </main>
  );
}
