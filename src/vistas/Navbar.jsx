import React from "react";
import { useContext, useState } from "react";
import { StoreContext } from "../context/ContextProvider";
import { BsTelephone } from "react-icons/bs";
import { FaBars } from "react-icons/fa";
import { HiShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
export default function Navbar() {
  const { allProduct, setAllProductRender, acumulador, handlerMenu } =
    useContext(StoreContext);
  const [inputSearch, setInputSearch] = useState("");
  const [open, setOpen] = useState(false);
  const handlerMenuMobile = () => setOpen((prev) => !prev);
  const handlerInputSearch = (e) => {
    setInputSearch(e.target.value);
    if (e.key === "Enter") {
      if (inputSearch.length > 0) {
        const filterCard = allProduct.filter((c) =>
          c.title.includes(inputSearch)
        );

        setAllProductRender(filterCard);
      } else {
        setAllProductRender(allProduct);
      }
    }
  };
  const uniqueCategories = [
    ...new Set(allProduct.map((product) => product.category)),
  ];

  // men's clothing
  // jewelery
  // electronics
  // women's clothing
  // const filterCategories = allProduct.filter(
  //   (producto) => producto.category === "men's clothing"
  // );
  return (
    <header className="w-full bg-slate-500 fixed top-0 z-20 h-[7vh] md:h-[12vh] md:static">
      <div className="relative w-full flex justify-center items-center h-full gap-6 flex-col">
        {/* Esto es la navbar superior que solo aparece en 768px */}
        <div className=" hidden w-full md:flex justify-between items-center bg-[#036043] h-[5vh] text-white px-6 ">
          <div className="flex items-center">
            <BsTelephone />
            <span>+54 11 5264-9628</span>
          </div>
          <span>Get 50% Off on Selected Items | Shop now</span>
          <span>Shopcart - E-commerce</span>
        </div>

        <div className="w-full h-[7vh] items-center md:items-stretch flex justify-around  gap-1 px-6">
          <Link to="/sobre-nosotros">
            <span className="hidden md:block cursor-pointer ">
              Sobre Nosotros
            </span>
          </Link>
          <Link to="favoritos">
            <span className="hidden md:block cursor-pointer ">Favoritos</span>
          </Link>
          <input
            type="text"
            onKeyDown={handlerInputSearch}
            placeholder="Buscá tu producto..."
            className="outline-none pl-4 py-1 max-w-[900px] h-max w-[250px] "
          />

          <div className="flex relative">
            <HiShoppingBag
              size={30}
              className="hidden md:block cursor-pointer"
              onClick={handlerMenu}
            />
            <span className=" hidden md:block absolute top-0 right-0 text-lg font-semibold z-20 text-white">
              {acumulador}
            </span>
          </div>
          {/*----------------------------------------------- Esto es mobile -------------------------------------------------*/}
          <FaBars
            className="cursor-pointer block md:hidden"
            size={25}
            onClick={handlerMenuMobile}
          />

          {/* Esto es el menu desplegable mobile */}
          <div
            className={`${
              open ? "right-0" : "-right-full"
            } duration-300 transition-all top-full absolute w-[250px] border border-gray-500 flex flex-col gap-2 items-center justify-center z-40 bg-white h-[100px] md:hidden`}
          >
            <span
              onClick={handlerMenuMobile}
              className="cursor-pointer w-6 h-6 text-white bg-red-500  text-center absolute right-0 top-0 "
            >
              X
            </span>
            <span>Sobre Nosotros</span>
            <span>Favoritos</span>
            <select>
              <option>Categorias</option>
              {uniqueCategories.map((producto, index) => (
                <option key={index}>{producto}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}
