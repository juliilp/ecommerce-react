import { Link } from "react-router-dom";
import Carousel from "./Carousel";
import HomeImagen from "../assets/imgHomeMain.jpg";
export default function MainHome() {
  // const { handlerMenu } = useContext(StoreContext);
  return (
    // w-full h-[90vh] mt-[10vh] lg:flex lg:justify-center
    <main className="">
      <Link to="/dashboard">
        <h1>Dashboard</h1>
      </Link>
    </main>
  );
}
