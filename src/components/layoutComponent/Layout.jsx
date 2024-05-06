import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { useEffect } from "react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";

function Layout() {
  const { clienteLogged } = useClienteLoggedContext();
  const { darkMode } = useDarkMode();
  const { itemsCarro } = useItemsCarroContext();
  let _location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (clienteLogged === null && _location.pathname === "/Pedido/MostrarPedido") {
      navigate("/");
    }
  }, [clienteLogged]);
  useEffect(() => {
    //Si el carrito está vacío y se intenta acceder a la página de pedido, redirigir a la página principal
    if (itemsCarro.length === 0 && _location.pathname === "/Pedido/MostrarPedido") {
      navigate("/");
    }
  }, [itemsCarro]);
  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-white" : "bg-gray-800"
      }`}
    >
      <Header />
      <div className="container mx-auto flex-grow">
        <div className="flex flex-wrap h-full">
          <div className="w-full h-full">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
