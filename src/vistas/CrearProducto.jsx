import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/ContextProvider";
export default function CrearProducto() {
  const navigate = useNavigate();
  const { allProduct, allProductRender, setAllProductRender, setAllProduct } =
    useContext(StoreContext);
  useEffect(() => {
    const admin = localStorage.getItem("userAdmin");
    if (!admin && admin !== 2) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const allId = allProductRender.map((c) => c.id);
    const MathMaxId = Math.max(...allId) + 1;
    setForm((prevForm) => ({
      ...prevForm,
      id: MathMaxId,
    }));
  }, [allProductRender]);

  const uniqueCategories = [
    ...new Set(allProduct.map((product) => product.category)),
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setAllProductRender([...allProductRender, form]);
    setAllProduct([...allProduct, form]);
    localStorage.setItem(form.title, form.visible);
  };
  const formHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const [form, setForm] = useState({
    id: null,
    image: "",
    description: "",
    price: "",
    title: "",
    stock: 10,
    visible: false.toString(),
  });
  return (
    <section className="w-full h-[93vh] md:h-[70vh] flex justify-center items-center flex-col font-poppins">
      <Link to="/">Ir al home</Link>
      <form
        className="flex w-[350px] h-[300px] border border-blue-300 flex-col bg-slate-500 gap-6 justify-center items-center"
        onSubmit={submitHandler}
      >
        <select className="hidden md:block h-max w-max">
          <option>Categorias</option>
          {uniqueCategories.map((producto, index) => (
            <option key={index} value={producto}>
              {producto}
            </option>
          ))}
        </select>
        <div>
          <span>description</span>
          <input type="text" name="description" onChange={formHandler} />
        </div>
        <div>
          <span>image</span>
          <input type="text" name="image" onChange={formHandler} />
        </div>
        <div>
          <span>price</span>
          <input type="text" name="price" onChange={formHandler} />
        </div>
        <div>
          <span>title</span>
          <input type="text" name="title" onChange={formHandler} />
        </div>
        <button>Enviar datos</button>
      </form>
    </section>
  );
}
