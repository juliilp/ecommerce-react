import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { MdArrowForward } from "react-icons/md";
import CardMenuDesplegable from "./CardMenuDesplegable";
export default function MenuDesplegable() {
  const { openMenu, handlerMenu, card, acumulador, total, setCard } =
    useContext(StoreContext);
  return (
    <section
      className={`${
        openMenu ? "right-0" : "-right-full"
      } bg-white fixed w-full h-screen top-0 md:w-[47vw] lg:w-[40vw] xl:[20vw] 2xl:[15vw] transition-all duration-300 ease-in-out z-[999]`}
    >
      <div className="flex justify-between items-center  border border-gray-400 h-[70px] pl-6">
        <span className="font-semibold">Items Acumulados ({acumulador})</span>
        <MdArrowForward size={30} onClick={handlerMenu} />
      </div>
      <div className="h-[550px] overflow-y-auto">
        {card &&
          card.map((c) => {
            return (
              <CardMenuDesplegable
                key={c.id}
                image={c.image}
                title={c.title}
                id={c.id}
                amount={c.amount}
                price={c.price}
              />
            );
          })}
      </div>
      <div className="w-full flex justify-between px-8">
        <p>TOTAL: ${total}</p>
        <button onClick={() => setCard([])}>Clear Carrito</button>
      </div>
    </section>
  );
}
