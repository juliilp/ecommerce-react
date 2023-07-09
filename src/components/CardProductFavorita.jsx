import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { BsPlus } from "react-icons/bs";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
export default function CardProductFavorita({
  image,
  id,
  category,
  price,
  title,
  producto,
}) {
  const { handlerAgregarCard, handlerCardRemoveFavoritas } =
    useContext(StoreContext);
  return (
    <section
      className="w-full h-full flex flex-col justify-center items-center mb-8"
      key={id}
    >
      <div className="  h-[250px] w-[300px] flex justify-center items-center  border border-[#e4e4e4] mb-4 relative transition group xl:w-[350px] xl-[300px] 2xl:w-[400px] 2xl:h-[350px] ">
        <img
          src={image}
          className="max-h-[160px] group-hover:scale-125 duration-300 "
          alt="imagen"
        />
        <div className="flex flex-col justify-around items-center absolute top-4 bg-red-600 py-1 gap-2 w-[50px] h-[100px] opacity-0 -right-10 group-hover:opacity-100 duration-300 group-hover:right-4 z-10 ">
          <BsPlus
            size={30}
            color="white"
            className="cursor-pointer"
            onClick={() => handlerAgregarCard(producto, id)}
          />

          <button onClick={() => handlerCardRemoveFavoritas(id)}>
            <AiTwotoneHeart color="white" />
          </button>
        </div>
      </div>
      <div className=" w-[300px]  flex justify-between ">
        <div>
          <p className="text-[#8e8A8C] font-semibold">{category}</p>
          <h2 className="font-bold w-[70%]">{title}</h2>
        </div>
        <span className="text-lg">${price}</span>
      </div>
    </section>
  );
}
