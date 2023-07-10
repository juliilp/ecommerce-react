import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/ContextProvider";
import Swal from "sweetalert2";
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

  const [form, setForm] = useState({
    id: null,
    image: "",
    description: "",
    price: "",
    title: "",
    stock: 10,
    amount: 1,
    category: "",
    visible: false.toString(),
    create: true,
  });

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
    console.log(form);
    e.preventDefault();
    setAllProductRender([...allProductRender, form]);
    setAllProduct([...allProduct, form]);
    const saveToLocalStorage = (data) => {
      const existingData = localStorage.getItem("formData");
      let formDataArray = [];

      if (existingData) {
        formDataArray = JSON.parse(existingData);
      }

      formDataArray.push(form);
      localStorage.setItem("formData", JSON.stringify(formDataArray));
    };
    saveToLocalStorage();

    setForm({
      id: null,
      image: "",
      description: "",
      price: "",
      title: "",
      stock: 10,
      category: "",
      visible: false.toString(),
    });
    Swal.fire("Producto creado!", "success");
    console.log(allProduct);
  };
  const formHandler = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "price") {
      setForm({
        ...form,
        price: parseInt(e.target.value),
      });
    }
    console.log(e.target.value);
    console.log(form);
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      category: e.target.value,
    });
  };
  console.log(form);
  return (
    <section className="w-full h-[93vh] md:h-[70vh] mt-[15vh] flex justify-center items-center flex-col font-poppins">
      <form
        className="flex w-[350px] h-[300px] border border-blue-300 flex-col  gap-2 justify-center items-center rounded-xl md:w-[500px] md:h-[400px]"
        onSubmit={submitHandler}
      >
        <div className="w-full flex pl-4">
          <select
            className="hidden md:block h-max w-max outline-none "
            onChange={handleSelect}
          >
            <option>Categorias</option>
            {uniqueCategories.map((producto, index) => (
              <option key={index} name="category" value={producto}>
                {producto}
              </option>
            ))}
          </select>
        </div>
        <div className="flex  flex-col">
          <span className="">Description</span>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={formHandler}
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none"
            placeholder="Escribí tu descripcion.."
          />
        </div>
        <div className="flex  flex-col">
          <span className="">Image</span>
          <input
            type="text"
            name="image"
            onChange={formHandler}
            value={form.image}
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none"
            placeholder="Pegá el link de tu imagen"
          />
        </div>
        <div className="flex  flex-col">
          <span className="">Price</span>
          <input
            type="number"
            name="price"
            onChange={formHandler}
            value={form.price}
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none"
            placeholder="Escribí tu precio.."
          />
        </div>
        <div className="flex  flex-col">
          <span className="">Title</span>
          <input
            type="text"
            name="title"
            onChange={formHandler}
            value={form.title}
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none"
            placeholder="Escribí tu título"
          />
        </div>
        <button className="py-2 px-16 rounded-lg bg-[#010001] text-white font-semibold">
          Enviar datos
        </button>
      </form>
    </section>
  );
}
