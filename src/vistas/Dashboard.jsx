import { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
export default function Dashboard() {
  const {
    allProductRender,
    handlerBorradoLogico,
    handlerBorradoLogicoLocalStorage,
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
        text: "Usuario Incorrecto!",
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
        <section className="w-full h-full flex justify-center items-center font-poppins">
          <form
            className=" flex flex-col justify-center w-[300px] h-[400px] gap-6 mt-6"
            onSubmit={handlerSubmit}
          >
            <div className="flex flex-col">
              <span>Usuario</span>
              <input
                type="text"
                name="nombre"
                onChange={handlerUser}
                className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none "
                placeholder="Escribí tu usuario..."
              />
            </div>
            <div className="flex flex-col">
              <span>Contraseña</span>
              <input
                type="password"
                name="contraseña"
                onChange={handlerUser}
                className="rounded w-full border-gray-200 bg-gray-100 p-4 pr-32 text-sm font-medium focus:ring-0 outline-none "
                placeholder="********"
              />
            </div>
            <button className=" py-2 px-16 rounded-lg bg-[#010001] text-white font-semibold">
              Ingresar
            </button>
            {error && <p>{error}</p>}
          </form>
        </section>
      )}
      {steps === 2 && (
        <section className="w-full">
          <Link to="/">Home</Link>
          <Link
            to="/crearproducto"
            className="block py-2 px-6 bg-slate-500 cursor-pointer w-max rounded-full text-white ml-6"
          >
            Crear Producto
          </Link>
          <button onClick={handlerDeslogear}>Deslogear</button>
          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto mt-4">
              {allProductRender.map((c) => {
                console.log(allProductRender);

                if (!c.create) {
                  if (!localStorage.getItem(c.title)) {
                    localStorage.setItem(c.title, true);
                  }
                  const valor = localStorage.getItem(c.title);
                  return (
                    <div
                      key={c.id}
                      className="w-[300px] h-[300px] border border-[#e4e4e4] flex justify-center items-center flex-col overflow-hidden "
                    >
                      <img
                        src={c.image}
                        alt="Imagen"
                        className="w-[160px] h-[160px]"
                      />
                      <h2>{c.title}</h2>
                      <button onClick={() => handlerBorradoLogico(c.id)}>
                        {valor === "true"
                          ? "Click para deshabilitar"
                          : "Click para habilitar"}
                      </button>
                    </div>
                  );
                }
              })}
              {ItemLocalStorage &&
                ItemLocalStorage.map((producto) => {
                  return (
                    <div
                      key={producto.id}
                      className="w-[300px] h-[300px] border border-[#e4e4e4] flex justify-center items-center flex-col overflow-hidden "
                    >
                      <img
                        src={producto.image}
                        alt="Imagen"
                        className="w-[160px] h-[160px]"
                      />
                      <h2>{producto.title}</h2>
                      <button
                        onClick={() =>
                          handlerBorradoLogicoLocalStorage(producto.id)
                        }
                      >
                        {producto.visible === "true"
                          ? "Click para deshabilitar"
                          : "Click para habilitar"}
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
