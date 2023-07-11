import { IoMdAdd, IoMdClose, IoMdRemove } from "react-icons/io";
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
    <section className="my-8 flex relative items-center py-6">
      <img src={image} alt="imagen" className="w-[110px]" />

      <div className="px-6 w-full">
        <span className="  w-[200px] font-semibold mb-4 block">{title}</span>

        <div className="flex w-full justify-evenly gap-3 ">
          <div className="flex items-center border w-[150px] justify-between  py-1 px-4">
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
            <span className="text-[#898688]">$ {price}</span>
            <span className="font-semibold">
              ${(price * amount).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <IoMdClose
        className="cursor-pointer absolute top-4 right-0 text-gray-500 "
        size={30}
        onClick={() => handlerRemoveCard(id)}
      />
    </section>
  );
}
