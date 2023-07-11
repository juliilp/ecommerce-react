import { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
export default function Dashboard() {
  const {
    allProductRender,
    handlerBorradoLogico,
    handlerBorradoLogicoLocalStorage,
    productosCreados,
  } = useContext(StoreContext);
  const [steps, setSteps] = useState(1);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    nombre: "",
    contraseña: "",
  });
  const handlerUser = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (localStorage.getItem("userAdmin")) {
      setSteps(2);
    }
  }, []);

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (user.nombre === "admin" && user.contraseña === "admin") {
      setError("");
      setSteps(2);
      localStorage.setItem("userAdmin", 2);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User Wrong!",
      });
    }
  };

  const handlerDeslogear = () => {
    setSteps(1);
    localStorage.removeItem("userAdmin");
  };
  const ItemLocalStorage = JSON.parse(localStorage.getItem("formData"));
  return (
    <>
      {steps === 1 && (
        <motion.section
          className="w-full h-full flex justify-center items-center font-poppins mt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
        >
          <form
            className=" flex flex-col justify-center w-[300px] h-[400px] gap-6 mt-6"
            onSubmit={handlerSubmit}
          >
            <div>
              <p>user: admin</p>
              <p>password: admin</p>
            </div>
            <div className="flex flex-col">
              <span>User</span>
              <input
                type="text"
                name="nombre"
                onChange={handlerUser}
                className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none "
                placeholder="user..."
              />
            </div>
            <div className="flex flex-col">
              <span>Password</span>
              <input
                type="password"
                name="contraseña"
                onChange={handlerUser}
                className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none "
                placeholder="********"
              />
            </div>
            <button className=" py-2 px-16 rounded-lg bg-[#010001] text-white font-semibold">
              Sign in
            </button>
            {error && <p>{error}</p>}
          </form>
        </motion.section>
      )}
      {steps === 2 && (
        <motion.section
          className="w-full mt-[15vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <div className="flex flex-col items-center w-full gap-4 justify-around md:flex-row md:gap-0">
            <Link to="/crearproducto">
              <button className="h-[40px] w-[150px] rounded-xl bg-[#E4B363] text-white font-semibold text-center border-none">
                Create product
              </button>
            </Link>
            <button
              onClick={handlerDeslogear}
              className="h-[40px] w-[150px] rounded-xl text-white bg-[#E4B363]  font-semibold text-center"
            >
              Disconnect
            </button>
          </div>
          <div className="w-full flex justify-center items-center ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
              {allProductRender.map((c) => {
                if (!c.create) {
                  if (!localStorage.getItem(c.title)) {
                    localStorage.setItem(c.title, true);
                  }
                  const valor = localStorage.getItem(c.title);
                  return (
                    <div
                      key={c.id}
                      className="w-[350px] h-[400px] flex justify-center items-center flex-col overflow-hidden "
                    >
                      <div className="flex items-center justify-center">
                        <img
                          src={c.image}
                          alt="Imagen"
                          className="w-[250px] p-8 h-[250px] border border-[#e4e4e4] "
                        />
                      </div>

                      <h2 className="w-[250px] font-semibold my-4 text-center">
                        {c.title}
                      </h2>
                      <button
                        onClick={() => handlerBorradoLogico(c.id)}
                        className="h-[40px] w-[150px] rounded-xl bg-[#E4B363] text-white font-semibold text-center border-none"
                      >
                        {valor === "true" ? "Disabled" : "Enabled"}
                      </button>
                    </div>
                  );
                }
              })}
              {ItemLocalStorage &&
                ItemLocalStorage.map((producto) => {
                  return (
                    <section
                      key={producto.id}
                      className="w-[350px] h-[400px] flex justify-center items-center flex-col overflow-hidden "
                    >
                      <div className="flex items-center justify-center">
                        <img
                          src={producto.image}
                          alt="Imagen"
                          className="w-[250px] p-8 h-[250px] border border-[#e4e4e4]"
                        />
                      </div>
                      <h2 className="w-[250px] font-semibold my-4 text-center">
                        {producto.title}
                      </h2>
                      <button
                        onClick={() =>
                          handlerBorradoLogicoLocalStorage(producto.id)
                        }
                        className="h-[40px] w-[150px] rounded-xl bg-[#E4B363] text-white font-semibold text-center border-none"
                      >
                        {producto.visible === "true" ? "Disabled" : "Enabled"}
                      </button>
                    </section>
                  );
                })}
            </div>
            <AnimatePresence>
              {productosCreados &&
                productosCreados.length === 0 &&
                allProductRender &&
                allProductRender.length === 0 && (
                  <div className="flex w-full items-center justify-center mt-10">
                    <motion.p
                      className="text-2xl font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      ¡Ningún producto coincide con el nombre de tu búsqueda!
                    </motion.p>
                  </div>
                )}
            </AnimatePresence>
          </div>
          <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              className: "",
              duration: 2500,
              style: {
                background: "#363636",
                color: "#fff",
              },
              success: {
                duration: 3000,
                theme: {
                  primary: "orange",
                  secondary: "black",
                },
              },
            }}
          />
        </motion.section>
      )}
    </>
  );
}
