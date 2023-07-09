import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { BsPlus } from "react-icons/bs";
import { Toaster } from "react-hot-toast";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
export default function CardProducts({
  image,
  id,
  category,
  price,
  title,
  producto,
}) {
  const {
    handlerAgregarCard,
    handlerCardAddFavoritas,
    handlerCardRemoveFavoritas,
    cardFavoritas,
  } = useContext(StoreContext);
  return (
    <section
      className="w-[250px] h-[250px] flex flex-col justify-center items-center mb-8"
      key={id}
    >
      <div className="  h-full w-full flex justify-center items-center  border border-[#e4e4e4] mb-4 relative overflow-hidden transition group ">
        <Link to={`product/${id}`}>
          <img
            src={image}
            className="max-h-[160px] g  roup-hover:scale-125 duration-300 "
            alt="imagen"
          />
        </Link>

        <div className="flex flex-col justify-around items-center absolute top-4 bg-red-600 py-1 gap-2 w-[50px] h-[100px] opacity-0 -right-10 group-hover:opacity-100 duration-300 group-hover:right-4 z-10 ">
          <BsPlus
            size={30}
            color="white"
            className="cursor-pointer"
            onClick={() => handlerAgregarCard(producto, id)}
          />
          {cardFavoritas.includes(producto) ? (
            <button onClick={() => handlerCardRemoveFavoritas(id)}>
              <AiTwotoneHeart color="white" />
            </button>
          ) : (
            <button onClick={() => handlerCardAddFavoritas(id)}>
              <AiOutlineHeart color="white" />
            </button>
          )}
        </div>
      </div>
      <div className=" w-full h-full ">
        <p>{category}</p>
        <Link to={`product/${id}`}>
          <h2 className="font-bold">{title}</h2>
        </Link>
        <span>{price}</span>
      </div>
      <Toaster
        position="top-left"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </section>
  );
}
