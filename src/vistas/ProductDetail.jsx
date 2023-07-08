import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../context/ContextProvider";
import axios from "axios";
import { IoMdAdd, IoMdRemove } from "react-icons/Io";
import { FaTruck, FaMotorcycle } from "react-icons/fa";
export default function ProductDetail() {
  const { handlerRestaAmount, handlerSumaAmount } = useContext(StoreContext);
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    const TraerDetail = async () => {
      const { data } = await axios(`https://fakestoreapi.com/products/${id}`);
      setProduct(data);
    };
    TraerDetail();
  }, []);
  console.log(product);
  return (
    <section className="flex w-full flex-col md:flex-row justify-center items-center ">
      {product ? (
        <>
          <img src={product.image} alt="imagen" className="w-[350px]" />
          <div className="flex flex-col gap-8">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <div className="flex flex-col">
              <span>
                {product.price} OR {product.price % 4}/month
              </span>
              <span>Suggested payments with 6 months special financing</span>
            </div>
            <div className=" flex gap-6">
              <div className="flex w-max items-center gap-6 py-1 px-3 border border-gray-400">
                <IoMdRemove
                  className="cursor-pointer"
                  onClick={() => handlerRestaAmount(id)}
                />
                <span>{product.amount ? product.amount : 1}</span>
                <IoMdAdd
                  className="cursor-pointer"
                  onClick={() => handlerSumaAmount(id)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <span>Only 12 item left!</span>
                <span>Don't miss it</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button>Buy Now</button>
              <button>Add to Cart</button>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1 items-center">
                  <FaTruck size={30} />
                  <span>Free Delivery</span>
                </div>
                <div className="flex gap-1 items-center">
                  <FaMotorcycle size={35} />
                  <span>Enter your Postal code for delivery Availability</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span>Return Delivery</span>
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
