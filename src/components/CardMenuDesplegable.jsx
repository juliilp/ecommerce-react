import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/Io";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
export default function CardMenuDesplegable({
  image,
  title,
  price,
  amount,
  id,
}) {
  const { handlerRemoveCard, handlerSumaAmount, handlerRestaAmount } =
    useContext(StoreContext);
  return (
    <section className="w-full h-[200px] flex flex-col mt-8  gap-4">
      <img src={image} alt="imagen" className="max-w-[80px] max-h-[100px] " />
      <div className="flex justify-between w-full">
        <div className="flex flex-col w-full gap-4 ">
          <span className=" w-[200px] font-semibold block">{title}</span>
          <div className="flex  items-center gap-8">
            <div className=" flex  items-center gap-6 py-1 px-3 border border-gray-400">
              <IoMdRemove
                className="cursor-pointer"
                onClick={() => handlerRestaAmount(id)}
              />
              <span>{amount ? amount : 1}</span>
              <IoMdAdd
                className="cursor-pointer"
                onClick={() => handlerSumaAmount(id)}
              />
            </div>
            <div className="flex justify-between w-full items-center ">
              <span>{price}</span>
              <span>${(price * amount).toFixed(2)}</span>
            </div>
          </div>
        </div>

        <IoMdClose
          className="cursor-pointer"
          size={25}
          onClick={() => handlerRemoveCard(id)}
        />
      </div>
    </section>
  );
}
