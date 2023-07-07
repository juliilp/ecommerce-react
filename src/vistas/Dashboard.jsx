import { useState } from "react";
export default function Dashboard() {
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

  const handlerSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (user.nombre === "admin" && user.contraseña === "admin") {
      setError("");
      setSteps(2);
    } else {
      setError("Datos incorrectos");
    }
  };

  const handlerDeslogear = () => {
    setSteps(1);
  };
  return (
    <>
      {steps === 1 && (
        <section className="w-full h-full flex justify-center items-center">
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
        <section>
          <h1>Acá va a estar el borrado lógico</h1>
          <button onClick={handlerDeslogear}>Deslogear</button>
        </section>
      )}
    </>
  );
}
