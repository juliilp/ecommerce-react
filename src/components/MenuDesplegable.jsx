import { useContext, useEffect } from "react";
import { StoreContext } from "../context/ContextProvider";
import { MdArrowForward, MdOutlineCleaningServices } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import CardMenuDesplegable from "./CardMenuDesplegable";
import { AnimatePresence, motion } from "framer-motion";
export default function MenuDesplegable() {
  const {
    openMenu,
    handlerMenu,
    card,
    acumulador,
    total,
    setCard,
    setOpenMenu,
  } = useContext(StoreContext);

  useEffect(() => {
    if (card.length === 0) {
      setOpenMenu(false);
    }
  }, [card]);

  return (
    <motion.section
      className={`${
        openMenu ? "right-0" : "-right-full"
      } bg-white fixed w-full h-screen top-0 md:w-[55vw] lg:w-[50vw] xl:w-[40vw] 2xl:w-[30vw] transition-all duration-300 ease-in-out z-[999]`}
    >
      <div className="flex justify-between items-center  border-b border-gray-400 h-[70px] pl-6">
        <span className="font-semibold">Items Acumulados ({acumulador})</span>
        <MdArrowForward
          size={30}
          onClick={handlerMenu}
          className="cursor-pointer"
        />
      </div>
      <AnimatePresence>
        <motion.div
          className="h-[600px] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {card &&
            card.map((c, key) => {
              return (
                <CardMenuDesplegable
                  key={key}
                  image={c.image}
                  title={c.title}
                  id={c.id}
                  amount={c.amount}
                  price={c.price}
                />
              );
            })}
        </motion.div>
      </AnimatePresence>
      <div className="w-full flex justify-between items-center  px-12">
        <p className="font-semibold">
          TOTAL:<span className="pl-2">${total.toFixed(2)}</span>{" "}
        </p>
        <div className=" flex cursor-pointer bg-red-500 text-white w-12 h-12 items-center justify-center ">
          <FiTrash2 onClick={() => setCard([])} />
        </div>
      </div>
    </motion.section>
  );
}
