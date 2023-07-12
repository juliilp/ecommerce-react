import { Link } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../context/ContextProvider";
import { BsPlus } from "react-icons/bs";
import { Toaster } from "react-hot-toast";
import { AiTwotoneHeart, AiOutlineHeart } from "react-icons/ai";
import { motion, useInView } from "framer-motion";
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
  const options = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  const ref = useRef();
  const view = useInView(ref, { once: true });
  useEffect(() => {
    console.log(view);
  }, [view]);
  return (
    <motion.section
      ref={ref}
      variants={options}
      className=" h-full flex flex-col justify-center items-center mt my-16 overflow-hidden  "
      key={id}
      initial="hidden"
      animate={view ? "visible" : "hidden"}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className=" w-[300px] h-[250px] flex justify-center items-center  border border-[#e4e4e4] mb-4 relative transition group overflow-hidden ">
        <Link to={`product/${id}`}>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={image}
              className="max-h-[130px] group-hover:scale-125 duration-300 pointer-events-none "
              alt="imagen"
            />
          </div>
        </Link>

        <div className="flex flex-col justify-around items-center absolute top-4 bg-red-600 py-1 gap-2 w-[50px] h-[100px] opacity-0  -right-10  pointer-events-none  group-hover:pointer-events-auto group-hover:opacity-100 duration-300 group-hover:right-4 z-10 ">
          <BsPlus
            size={30}
            color="white"
            className="cursor-pointer"
            onClick={() => handlerAgregarCard(producto, id)}
          />
          {cardFavoritas.find((c) => c.id === id) ? (
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
      {/* xl:w-[350px] 2xl:w-[400px] */}
      <div className=" w-[300px] h-[50px] flex justify-between ">
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
          // Define default options
          className: "",
          duration: 2500,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: {
            duration: 2500,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </motion.section>
  );
}
