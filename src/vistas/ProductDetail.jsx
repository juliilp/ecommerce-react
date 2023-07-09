import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/ContextProvider";
import axios from "axios";
import { IoMdAdd, IoMdRemove } from "react-icons/Io";
import { FaTruck, FaMotorcycle } from "react-icons/fa";
export default function ProductDetail() {
  const { allProductRender, card, setCard } = useContext(StoreContext);
  const { id } = useParams();
  const [product, setProduct] = useState(allProductRender);
  const [amount, setAmount] = useState(product && product.amount);
  useEffect(() => {
    const detail = allProductRender.find((c) => c.id == id);
    setProduct(detail);
  }, [allProductRender]);

  useEffect(() => {
    const storedCard = localStorage.getItem("agregarcard");
    if (storedCard) {
      setCard(JSON.parse(storedCard));
    }
  }, []);

  const handlerSumaAmountDetail = () => {
    const findCard = card.find(
      (c) => c.id.toString() === product.id.toString()
    );

    if (findCard) {
      const updatedProduct = { ...product, amount: product.amount + 1 };
      setProduct(updatedProduct);
      const updatedCard = [
        ...card.filter((c) => c.id.toString() !== product.id.toString()),
        updatedProduct,
      ];
      setCard(updatedCard);
      localStorage.setItem("agregarcard", JSON.stringify(updatedCard));
    } else {
      setCard([...card, product]);
      localStorage.setItem("agregarcard", JSON.stringify([...card, product]));
    }
  };

  const handlerRestaAmountDetail = () => {
    const findCard = card.find(
      (c) => c.id.toString() === product.id.toString()
    );

    if (findCard) {
      if (findCard.amount === 1) {
        // Si la cantidad es 1, se mantiene igual, no se resta ni se elimina
        return;
      } else {
        const updatedProduct = { ...product, amount: product.amount - 1 };
        setProduct(updatedProduct);
        const updatedCard = [
          ...card.filter((c) => c.id.toString() !== product.id.toString()),
          updatedProduct,
        ];
        setCard(updatedCard);
        localStorage.setItem("agregarcard", JSON.stringify(updatedCard));
      }
    }
  };

  return (
    <section className="flex w-full flex-col md:flex-row justify-center items-center mt-[5vh] px-10 mb-[100px] md:mb-0 md:px-0 md:gap-12 font-poppins xl:gap-40">
      {product ? (
        <>
          <div className="mt-[5vh] border border- p-8 flex justify-center items-center  ">
            <img
              src={product.image}
              alt="imagen"
              className="w-[200px] md:w-[250px] xl:w-[350px]"
            />
          </div>
          <div className="flex flex-col gap-8 md:gap-4 xl:w-[400px] xl:justify-center xl:gap-6">
            <h1 className="font-bold w-[200px] mx-auto text-[20px] mt-6 mb-3 md:w-[250px] md:text-[25px] xl:w-[350px] xl:text-[30px]">
              {product.title}
            </h1>
            <p className="text-[#8E8A8C] w-[295px] xl:w-[375px] ">
              {product.description}
            </p>
            <div className="flex flex-col  w-[295px] ">
              <span className="text-[16px] font-bold">
                <span className="text-[20px] md:text-[25px] xl:text-[30px]">
                  ${product.price}
                </span>{" "}
                OR{" "}
                <span className="text-[20px] md:text-[25px] xl:text-[30px]">
                  ${(product.price % 4).toFixed(2)}
                </span>
                /month
              </span>
              <span className="text-[#8e8A8C] font-semibold">
                Suggested payments with 6 months special financing
              </span>
            </div>
            <div className=" flex gap-4 items-center md:gap-6 xl:gap-10 ">
              <div className="flex w-[146px] h-max items-center gap-6  px-7 py-3 border border-gray-400 rounded-full bg-[#F6F5F6]  ">
                <IoMdRemove
                  className="cursor-pointer"
                  onClick={() => handlerRestaAmountDetail(id)}
                />
                <span>{product.amount}</span>
                <IoMdAdd
                  className="cursor-pointer"
                  onClick={handlerSumaAmountDetail}
                />
              </div>
              <div className="flex flex-col">
                <span>
                  Only{" "}
                  <span className="text-[#F7AE7B] font-semibold">12 item</span>{" "}
                  left!
                </span>
                <span>Don't miss it</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="mx-auto bg-red-500 rounded-full py-3 px-9 text-white font-semibold xl:py-5 xl:px-16 ">
                Buy Now
              </button>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <FaTruck size={30} color="#FC954B" />
                  <span className="font-semibold">Free Delivery</span>
                </div>

                <span>Enter your Postal code for delivery Availability</span>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <FaMotorcycle size={35} color="#FC954B" />
                  <span className="font-semibold">Return Delivery</span>
                </div>
                <span>sapn 30days Delivery Return. Details</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}
