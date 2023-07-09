import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import HomeImagen from "../assets/imgHomeMain.jpg";
export default function MainHome() {
  // const { handlerMenu } = useContext(StoreContext);
  return (
    <main className="w-full h-[90vh] mt-[10vh] lg:flex lg:justify-center">
      <div className="flex flex-col gap-12">
        <h1 className="font-bold pt-12 text-center text-2xl  font-sans text-[#2e2e2e] ">
          ¡Bienvenido/a a [nombre de tu ecommerce]!
        </h1>
        <p className="font-sans px-12 max-w-[500px] mx-auto">
          Descubre nuestra amplia selección de productos de alta calidad. Desde
          moda y accesorios hasta electrónica y hogar, tenemos todo lo que
          necesitas. Explora y encuentra los mejores productos al mejor precio.
          ¡Empieza a comprar ahora y disfruta de una experiencia de compra
          excepcional!
        </p>
      </div>
      <img
        src={HomeImagen}
        alt="imagenHome"
        className="max-w-[400px] mx-auto "
      />
    </main>
  );
}
