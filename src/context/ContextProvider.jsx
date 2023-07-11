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
  const [cardFavoritasRender, setCardFavoritasRender] = useState(
    storedCardFavoritas ? JSON.parse(storedCardFavoritas) : []
  );
  const [openMenu, setOpenMenu] = useState(false);
  const [card, setCard] = useState(agregarCard ? JSON.parse(agregarCard) : []);
  const [acumulador, setAcumulador] = useState(0);
  const [total, setTotal] = useState(0);
  const [borradoLogico, setBorradoLogico] = useState(true);
  const [refresh, setRefresh] = useState("");
  const [switcherBorradoLogico, setSwitcherBorradoLogico] = useState("");
  const [productosCreados, setProductosCreados] = useState("");
  const [allProductCreados, setAllProductCreados] = useState();
  useEffect(() => {
    const cardLocalStorage = JSON.parse(localStorage.getItem("formData"));
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
        visible: localStorage.getItem(e.title) || "true",
        stock: 10,
        amount: 1,
      };
      array.push(algo);
    });
    if (cardLocalStorage) {
      cardLocalStorage.map((e) => array.push(e));
    }
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
    findProduct.visible === "true"
      ? (findProduct.visible = "false")
      : (findProduct.visible = "true");
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
  };

  const handlerBorradoLogicoLocalStorage = (id) => {
    const itemLocalStorage = JSON.parse(localStorage.getItem("formData")) || [];
    const findProductIndex = itemLocalStorage.findIndex((c) => c.id === id);
    if (findProductIndex !== -1) {
      const findProduct = itemLocalStorage[findProductIndex];
      findProduct.visible = findProduct.visible === "true" ? "false" : "true";
      localStorage.setItem("formData", JSON.stringify(itemLocalStorage));
      setRefresh(Math.random());
    }
  };
  const handlerCardAddFavoritas = (id) => {
    const cardFound = allProduct.find((item) => item.id === id);

    if (!cardFavoritas.includes(cardFound)) {
      setCardFavoritas([...cardFavoritas, cardFound]);
      setCardFavoritasRender([...cardFavoritas, cardFound]);
      localStorage.setItem(
        "cardFavoritas",
        JSON.stringify([...cardFavoritas, cardFound])
      );
    }
    toast("Agregado a favoritos!");
  };
  const handlerCardRemoveFavoritas = (id) => {
    toast("Sacado de favoritos!");
    const cardRemove = cardFavoritas.filter((c) => c.id !== id);

    const updatedCardFavoritas = cardFavoritas.filter((c) => c.id !== id);
    localStorage.setItem("cardFavoritas", JSON.stringify(updatedCardFavoritas));
    setCardFavoritas(cardRemove);
  };
  // Este handlerMenu es para la Sidebar/barra lateral del home se abra y cierra
  const handlerMenu = () => setOpenMenu((val) => !val);

  const handlerAgregarCard = (product, id) => {
    console.log(product);
    console.log(id);
    const newItem = { ...product, amount: 1 };
    const cardItem = card.find((item) => item.id === id);

    if (cardItem) {
      const newCart = card.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: cardItem.amount + 1,
          };
        } else {
          return item;
        }
      });
      setCard(newCart);
      localStorage.setItem("agregarcard", JSON.stringify(newCart));
    } else {
      const newCart = [...card, { ...newItem }];
      setCard(newCart);
      localStorage.setItem("agregarcard", JSON.stringify(newCart));
    }
    toast("Agregado al carrito!");
  };

  const handlerAgregarCardDesdeFavoritas = (id) => {
    const product = cardFavoritas.find((card) => card.id === id);
    const newItem = { ...product, amount: 1 };
    const cardItem = card.find((item) => item.id === id);

    if (cardItem) {
      const newCart = card.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            amount: cardItem.amount + 1,
          };
        } else {
          return item;
        }
      });
      setCard(newCart);
      localStorage.setItem("agregarcard", JSON.stringify(newCart));
    } else {
      const newCart = [...card, { ...newItem }];
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
    localStorage.setItem("agregarcard", JSON.stringify(removeCard));
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
        handlerBorradoLogicoLocalStorage,
        handlerAgregarCardDesdeFavoritas,
        setCardFavoritasRender,
        cardFavoritasRender,
        setProductosCreados,
        productosCreados,
        setAllProductCreados,
        allProductCreados,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
