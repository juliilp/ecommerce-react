import { createContext, useEffect, useState } from "react";
import { fakestoreapi } from "../fakestoreapi/fakestoreapi";
export const StoreContext = createContext();

export default function ContextProvider({ children }) {
  const [allProduct, setAllProduct] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [card, setCard] = useState([]);
  useEffect(() => {
    setAllProduct(fakestoreapi);
  }, []);

  // Este handlerMenu es para la Sidebar/barra lateral del home se abra y cierra
  const handlerMenu = () => {
    setOpenMenu((val) => !val);
  };

  const handlerAgregarCard = (product, id) => {
    const newItem = { ...product, amount: 1 };
    // Busco si existe
    const cardItem = card.find((item) => item.id === id);
    // en el caso que exista, necesito aumentarle el amount en 1
    if (cardItem) {
      //Recorro TODAS las card para encontrar exactamente la que necesito aumentarle el amount en 1
      const newCart = [...card].map((item) => {
        //Una vez que lo encontré, solo hago una copia de lo que ya tiene y edito su amount en 1
        if (item.id === id) {
          return { ...item, amount: cardItem.amount + 1 };
        } else {
          return item;
        }
      });
      // y ya acá por último termino metiendo la card con el amount + 1 junto a las otras
      setCard(newCart);
    }
    // En el caso que no haya encontrado ninguna cart, agrega ese item con un amount en 1
    else {
      setCard([...card, newItem]);
    }
  };
  console.log(card);

  const handlerRemoveCard = (id) => {
    const removeCard = card.filter((c) => {
      return c.id !== id;
    });
    setCard(removeCard);
  };

  const handlerSumaAmount = (id) => {
    // encuentro la card
    const findCard = card.find((c) => c.id === id);
    handlerAgregarCard(findCard, id);
  };
  const handlerRestaAmount = (id) => {
    const findCard = card.find((c) => c.id === id);
    if (findCard) {
      const newCard = card.map((item) => {
        if (item.id === id) {
          return { ...item, amount: findCard.amount - 1 };
        } else {
          return item;
        }
      });
      setCard(newCard);
    }
    if (findCard.amount < 2) {
      handlerRemoveCard(id);
    }
  };
  return (
    <StoreContext.Provider
      value={{
        allProduct,
        setAllProduct,
        openMenu,
        setOpenMenu,
        handlerMenu,
        handlerAgregarCard,
        card,
        setCard,
        handlerRemoveCard,
        handlerSumaAmount,
        handlerRestaAmount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
