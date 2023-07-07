import { createContext, useEffect, useState } from "react";
import { fakestoreapi } from "../fakestoreapi/fakestoreapi";
export const StoreContext = createContext();

export default function ContextProvider({ children }) {
  const [allProduct, setAllProduct] = useState([]);
  const [allProductRender, setAllProductRender] = useState([]);
  const [cardFavoritas, setCardFavoritas] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const [card, setCard] = useState([]);
  const [acumulador, setAcumulador] = useState(0);
  const [total, setTotal] = useState(0);
  const [borradoLogico, setBorradoLogico] = useState(true);
  const [refresh, setRefresh] = useState("");
  const [switcherBorradoLogico, setSwitcherBorradoLogico] = useState("");
  useEffect(() => {
    const array = [];
    fakestoreapi.map((e) => {
      const algo = {
        id: e.id,
        title: e.title,
        category: e.category,
        description: e.description,
        image: e.image,
        price: e.price,
        rating: e.rating,
        visible: localStorage.getItem(e.title) || true,
      };
      array.push(algo);
    });
    setAllProduct(array);
    setAllProductRender(array);
  }, []);

  useEffect(() => {
    if (card) {
      const amount = card.reduce((acc, cardActual) => {
        return acc + cardActual.amount;
      }, 0);
      setAcumulador(amount);
    }
    const totalReduce = card.reduce((acc, currentCard) => {
      return acc + currentCard.price * currentCard.amount;
    }, 0);
    setTotal(totalReduce);
  }, [card]);

  const handlerBorradoLogico = (id) => {
    const findProduct = allProductRender.find((c) => c.id === id);
    findProduct.visible === true
      ? (findProduct.visible = false)
      : (findProduct.visible = true);
    const valor = localStorage.getItem(findProduct.title);
    if (valor === "false") {
      localStorage.setItem(findProduct.title, "true");
      setRefresh("dasd");
    }
    if (valor === "true") {
      localStorage.setItem(findProduct.title, "false");
      setRefresh("dasdsd");
    }
    console.log(valor);
  };
  const handlerCardAddFavoritas = (id) => {
    const cardFound = allProduct.find((item) => item.id === id);
    if (!cardFavoritas.includes(cardFound)) {
      setCardFavoritas([...cardFavoritas, cardFound]);
    }
  };
  const handlerCardRemoveFavoritas = (id) => {
    const cardFound = allProduct.find((c) => c.id === id);
    console.log(cardFound);
    const cardRemove = cardFavoritas.filter((c) => {
      return c.id !== id;
    });
    setCardFavoritas(cardRemove);
  };
  // Este handlerMenu es para la Sidebar/barra lateral del home se abra y cierra
  const handlerMenu = () => setOpenMenu((val) => !val);

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
        acumulador,
        total,
        allProductRender,
        setAllProductRender,
        cardFavoritas,
        setCardFavoritas,
        handlerCardAddFavoritas,
        handlerCardRemoveFavoritas,
        handlerBorradoLogico,
        setBorradoLogico,
        borradoLogico,
        switcherBorradoLogico,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
