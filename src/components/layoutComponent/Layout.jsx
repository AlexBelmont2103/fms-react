import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { useEffect } from "react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import clienteRESTService from "../../servicios/restCliente";

function Layout() {
  //#region Variables de contexto
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  const { darkMode } = useDarkMode();
  const { itemsCarro } = useItemsCarroContext();
  let _location = useLocation();
  const navigate = useNavigate();
  //#endregion

  //#region Funciones

  //#endregion

  //#region Efectos
  useEffect(() => {
    if (
      clienteLogged === null &&
      _location.pathname === "/Pedido/MostrarPedido"
    ) {
      navigate("/");
    }
  }, [clienteLogged]);
  useEffect(() => {
    //Si el carrito está vacío y se intenta acceder a la página de pedido, redirigir a la página principal
    if (
      itemsCarro.length === 0 &&
      _location.pathname === "/Pedido/MostrarPedido"
    ) {
      navigate("/");
    }
  }, [itemsCarro]);
  //Efecto para que si el clientelogged es null, busque en el session storage
  useEffect(() => {
    if (clienteLogged === null) {
      const recuperarCliente = async (id) => {
        let response = await clienteRESTService.recuperarCliente(id);
        if (response.ok) {
          let data = await response.json();
          // Aquí puedes manejar los datos
          dispatch({
            type: "CLIENTE_RECUPERAR",
            payload: {
              datoscliente: data.datoscliente,
              tokensesion: data.tokensesion,
            },
          });
        } else {
          console.log(`Error: ${response.status}`);
        }
      };
      let idCodificado = sessionStorage.getItem("idCliente");
      if (idCodificado) {
        let id = atob(idCodificado);
        recuperarCliente(id);
      }
    }
  }, [clienteLogged]);
  //#endregion
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
