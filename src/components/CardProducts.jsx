import { Link } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { BsFillEyeFill, BsPlus } from "react-icons/bs";
export default function CardProducts({
  image,
  id,
  category,
  price,
  title,
  producto,
}) {
  const { handlerAgregarCard } = useContext(StoreContext);
  return (
    <section
      className="w-full h-full flex flex-col justify-center items-center mb-8"
      key={id}
    >
      <div className="  h-[250px] w-[300px] flex justify-center items-center  border border-[#e4e4e4] mb-4 relative overflow-hidden transition group ">
        <Link to={`product/${id}`}>
          <img
            src={image}
            className="max-h-[160px] group-hover:scale-125 duration-300 "
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
          <Link to={`product/${id}`}>
            <div className="bg-white flex justify-center items-center w-[40px] h-[40px]">
              <BsFillEyeFill size={15} color="black" />
            </div>
          </Link>
        </div>
      </div>
      <div className=" w-[300px] h-[150px] ">
        <p>{category}</p>
        <Link to={`product/${id}`}>
          <h2 className="font-bold">{title}</h2>
        </Link>
        <span>{price}</span>
      </div>
    </section>
  );
}
