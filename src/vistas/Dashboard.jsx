import { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/ContextProvider";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { allProductRender, handlerBorradoLogico, switcherBorradoLogico } =
    useContext(StoreContext);
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
    console.log(user);
    if (user.nombre === "admin" && user.contraseña === "admin") {
      setError("");
      setSteps(2);
      localStorage.setItem("userAdmin", 2);
    } else {
      setError("Datos incorrectos");
    }
  };

  const handlerDeslogear = () => {
    setSteps(1);
    localStorage.removeItem("userAdmin");
  };
  return (
    <>
      {steps === 1 && (
        <section className="w-full h-full flex justify-center items-center font-poppins">
          <form
            className="border border-gray-500 flex flex-col items-center justify-center w-[300px] h-[400px] gap-6 bg-slate-600 mt-6"
            onSubmit={handlerSubmit}
          >
            <input
              type="text"
              name="nombre"
              onChange={handlerUser}
              className="outline-none"
              placeholder="usuario"
            />
            <input
              type="password"
              name="contraseña"
              onChange={handlerUser}
              className="outline-none"
              placeholder="contraseña"
            />
            <button className="bg-red-300 py-2 px-6 rounded-lg">Logear</button>
            {error && <p>{error}</p>}
          </form>
        </section>
      )}
      {steps === 2 && (
        <section className="flex justify-center items-center flex-col gap-2">
          <Link to="/">Home</Link>
          <button onClick={handlerDeslogear}>Deslogear</button>
          {allProductRender.map((c) => {
            if (!localStorage.getItem(c.title)) {
              localStorage.setItem(c.title, true);
            }
            const valor = localStorage.getItem(c.title);
            return (
              <div
                key={c.id}
                className="w-[350px] h-[350px] border border-gray-500 flex justify-center items-center flex-col "
              >
                <img src={c.image} alt="Imagen" className="w-[160px]" />
                <h2>{c.title}</h2>
                <button onClick={() => handlerBorradoLogico(c.id)}>
                  {valor === "true"
                    ? "Click para deshabilitar"
                    : "Click para habilitar"}
                </button>
              </div>
            );
          })}
        </section>
      )}
    </>
  );
}
