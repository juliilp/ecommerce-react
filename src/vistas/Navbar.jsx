import React from "react";
import { useContext, useState } from "react";
import { StoreContext } from "../context/ContextProvider";
import { BsTelephone } from "react-icons/bs";
import { HiShoppingBag, HiHome } from "react-icons/hi";
import { MdFavorite } from "react-icons/md";
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
          c.title.toLowerCase().includes(inputSearch.toLowerCase())
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

  return (
    <header className="w-full bg-white fixed top-0 z-20 h-[10vh] md:h-[12vh] ">
      <div className="relative w-full flex justify-center items-center h-full gap-6 flex-col">
        {/* Esto es la navbar superior que solo aparece en 768px */}
        <div className=" hidden w-full md:flex justify-between items-center bg-[#ff8811] h-[5vh] text-white px-6">
          <div className="flex items-center">
            <BsTelephone />
            <span>+54 11 5264-9628</span>
          </div>
          <span>Get 50% Off on Selected Items | Shop now</span>
          <span>Shopcart - E-commerce</span>
        </div>

        <div className=" w-full  h-[7vh] items-center flex flex-col gap-1 md:flex-row md:px-12  md:justify-center 2xl:gap-24  ">
          <input
            type="text"
            onKeyDown={handlerInputSearch}
            placeholder="Buscá tu producto..."
            className="rounded border-gray-200 bg-gray-100 p-2 pr-32 text-sm font-medium focus:ring-0 outline-none w-[500px] md:order-3 xl:w-[600px] xl:py-3"
          />
          <div className="w-full flex gap-12 items-center justify-around px-4 md:justify-around lg:w-[60%] xl:w-[50%] 2xl:w-[35%] 2xl:gap-24">
            <div className="flex relative cursor-pointer" onClick={handlerMenu}>
              <HiShoppingBag
                size="30"
                className="cursor-pointer"
                color="#909090"
              />
              <span className="absolute top-0 right-0 text-lg font-semibold z-20 ">
                {acumulador}
              </span>
            </div>
            <Link to="/">
              <div className="flex items-center">
                <HiHome size={30} className="cursor-pointer" />
                <span className="font-semibold">Inicio</span>
              </div>
            </Link>
            <div className="flex items-center">
              <MdFavorite color="red" size={30} />
              <Link to="favoritos">
                <span className="cursor-pointer font-semibold ">Favoritos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
