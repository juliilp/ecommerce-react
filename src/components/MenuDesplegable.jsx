import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { MdArrowForward } from "react-icons/md";
export default function MenuDesplegable() {
  const { openMenu, handlerMenu } = useContext(StoreContext);
  return (
    <section
      className={`${
        openMenu ? "right-0" : "-right-full"
      } bg-white fixed w-full h-screen top-0 md:w-[35vw] lg:w-[25vw] xl:[20vw] 2xl:[15vw] transition-all duration-300 ease-in-out z-[999]`}
    >
      <div>
        <div className="flex justify-between items-center px-2 h-7">
          <span className="font-semibold">Items Acumulados (0)</span>
          <MdArrowForward onClick={handlerMenu} />
        </div>
      </div>
    </section>
  );
}
