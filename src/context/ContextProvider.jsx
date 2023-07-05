import { createContext, useEffect, useState } from "react";
import { fakestoreapi } from "../fakestoreapi/fakestoreapi";
export const StoreContext = createContext();

export default function ContextProvider({ children }) {
  const [allProduct, setAllProduct] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  useEffect(() => {
    setAllProduct(fakestoreapi);
  }, []);

  // Este handlerMenu es para la Sidebar/barra lateral del home se abra y cierra
  const handlerMenu = () => {
    setOpenMenu((val) => !val);
  };

  const ItemFound = (id) => {
    const product = allProduct.find(id);
    console.log(product);
  };

  return (
    <StoreContext.Provider
      value={{
        allProduct,
        setAllProduct,
        openMenu,
        setOpenMenu,
        handlerMenu,
        ItemFound,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
