import { useEffect, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/ContextProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
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

  const ValidacionForm = (form) => {
    if (
      !form.image ||
      !form.description ||
      !form.price ||
      !form.title ||
      !form.category
    ) {
      return Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (
      !form.image ||
      !form.description ||
      !form.price ||
      !form.title ||
      !form.category
    ) {
      return Swal.fire({
        title: "Error!",
        text: "Do you want to continue",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
    console.log(form);
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
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setForm({
      ...form,
      category: e.target.value,
    });
  };

  return (
    <motion.section
      className="w-full  mt-[30vh] flex justify-center items-center flex-col font-poppins gap-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <select className="outline-none " onChange={handleSelect}>
        <option>Categories</option>
        {uniqueCategories.map((producto, index) => (
          <option key={index} name="category" value={producto}>
            {producto}
          </option>
        ))}
      </select>
      <form
        className="flex w-[350px]  flex-col  gap-2 justify-center items-center rounded-xl md:w-[500px] md:h-[400px]"
        onSubmit={submitHandler}
      >
        <div className="flex  flex-col">
          <span className="">Description</span>
          <input
            type="text"
            name="description"
            value={form.description}
            onChange={formHandler}
            className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none"
            placeholder="Description..."
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
            placeholder="Image..."
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
            placeholder="Price..."
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
            placeholder="Title..."
          />
        </div>
        <button className="py-2 px-16 rounded-lg bg-[#010001] text-white font-semibold mt-8">
          Send data
        </button>
      </form>
    </motion.section>
  );
}
