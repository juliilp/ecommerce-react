import { createContext, useEffect, useState } from "react";
import { fakestoreapi } from "../fakestoreapi/fakestoreapi";
import { toast } from "react-hot-toast";
export const StoreContext = createContext();

export default function ContextProvider({ children }) {
  const storedCardFavoritas = localStorage.getItem("cardFavoritas");
  const agregarCard = localStorage.getItem("agregarcard");
  const [allProduct, setAllProduct] = useState([]);
  const [allProductRender, setAllProductRender] = useState([]);
  const [cardFavoritas, setCardFavoritas] = useState(
    storedCardFavoritas ? JSON.parse(storedCardFavoritas) : []
  );
  const [openMenu, setOpenMenu] = useState(false);
  const [card, setCard] = useState(agregarCard ? JSON.parse(agregarCard) : []);
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
        stock: 10,
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
      // Si no tiene refresh, no me renderiza los cambios, y pongo un math random por que si es determinado dato en el siguiente onclick no lo va a renderizar por ser el mismo
      // dato, entonces eso me lleva a tener que hacer 3 click para mostrar el renderizado
      setRefresh(Math.random);
    } else {
      localStorage.setItem(findProduct.title, "false");
      setRefresh(Math.random);
    }
    console.log(valor);
  };
  const handlerCardAddFavoritas = (id) => {
    console.log(allProduct);
    const cardFound = allProduct.find((item) => item.id === id);
    if (!cardFavoritas.includes(cardFound)) {
      setCardFavoritas([...cardFavoritas, cardFound]);
      localStorage.setItem(
        "cardFavoritas",
        JSON.stringify([...cardFavoritas, cardFound])
      );
    }
    toast("Agregado a favoritos!");
  };
  const handlerCardRemoveFavoritas = (id) => {
    toast("Sacado de favoritos!");
    const cardFound = allProduct.find((c) => c.id === id);
    console.log(cardFound);
    const cardRemove = cardFavoritas.filter((c) => c.id !== id);

    const updatedCardFavoritas = cardFavoritas.filter((c) => c.id !== id);
    localStorage.setItem("cardFavoritas", JSON.stringify(updatedCardFavoritas));
    setCardFavoritas(cardRemove);
    console.log("remove");
  };
  // Este handlerMenu es para la Sidebar/barra lateral del home se abra y cierra
  const handlerMenu = () => setOpenMenu((val) => !val);

  const handlerAgregarCard = (product, id) => {
    console.log("12");
    const newItem = { ...product, amount: 1 };
    const cardItem = card.find((item) => item.id === id);

    if (cardItem) {
      const newCart = card.map((item) => {
        if (item.id === id) {
          return { ...item, amount: cardItem.amount + 1 };
        } else {
          return item;
        }
      });
      setCard(newCart);
      localStorage.setItem("agregarcard", JSON.stringify(newCart));
    } else {
      const newCart = [...card, newItem];
      setCard(newCart);
      localStorage.setItem("agregarcard", JSON.stringify(newCart));
    }

    toast("Agregado al carrito!");
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
