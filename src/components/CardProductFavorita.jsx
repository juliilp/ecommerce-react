import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { BsPlus } from "react-icons/bs";
import { AiTwotoneHeart } from "react-icons/ai";
import { Toaster } from "react-hot-toast";
export default function CardProductFavorita({
  image,
  id,
  category,
  price,
  title,
}) {
  const { handlerAgregarCardDesdeFavoritas, handlerCardRemoveFavoritas } =
    useContext(StoreContext);
  return (
    <section
      className="  w-full h-full flex flex-col justify-center items-center mt my-16 overflow-hidden  "
      key={id}
    >
      <div className=" w-[300px] h-[250px] flex justify-center items-center  border border-[#e4e4e4] mb-4 relative transition group lg:w-[350px] lg:h-[350px]">
        <div className="w-full h-full flex items-center justify-center">
          <img
            src={image ? image : "nad"}
            className="max-h-[160px] g  roup-hover:scale-125 duration-300 pointer-events-none "
            alt="imagen"
          />
        </div>

        <div className="flex flex-col justify-around items-center absolute top-4 bg-red-600 py-1 gap-2 w-[50px] h-[100px] opacity-0  -right-10  pointer-events-none  group-hover:pointer-events-auto group-hover:opacity-100 duration-300 group-hover:right-4 z-10 ">
          <BsPlus
            size={30}
            color="white"
            className="cursor-pointer"
            onClick={() => handlerAgregarCardDesdeFavoritas(id)}
          />

          <button onClick={() => handlerCardRemoveFavoritas(id)}>
            <AiTwotoneHeart color="white" />
          </button>
        </div>
      </div>
      {/* xl:w-[350px] 2xl:w-[400px] */}
      <div className=" w-[300px] lg:w-[350px] flex justify-between ">
        <div>
          <p className="text-[#8e8A8C] font-semibold lg:text-lg ">{category}</p>
          <Link to={`product/${id}`}>
            <h2 className="font-bold w-[80%] lg:text-lg lg:font-semibold ">
              {title}
            </h2>
          </Link>
        </div>
        <span className="text-lg lg:text-xl">${price}</span>
      </div>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 2500,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 3000,
            theme: {
              primary: "orange",
              secondary: "black",
            },
          },
        }}
      />
    </section>
  );
}

{
  /* <div className="flex flex-col justify-around items-center absolute top-4 bg-red-600 py-1 gap-2 w-[50px] h-[100px] opacity-0 -right-10 group-hover:opacity-100 duration-300 group-hover:right-4 z-10 ">
<BsPlus
  size={30}
  color="white"
  className="cursor-pointer"
  onClick={() => handlerAgregarCard(producto, id)}
/>

<button onClick={() => handlerCardRemoveFavoritas(id)}>
  <AiTwotoneHeart color="white" />
</button>
</div> */
}
