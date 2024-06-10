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
  //Efecto para que si el clientelogged es null, busque en el local storage
  useEffect(() => {
    console.log("Recuperando cliente desde el Layout");
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
      let idCodificado = localStorage.getItem("idCliente");
      if (idCodificado) {
        let id = atob(idCodificado);
        console.log("Id recuperado", id);
        recuperarCliente(id);
        console.log("Cliente recuperado desde el local storage", clienteLogged);
      }
    }
  }, []);
  //Si el clienteLogged es null o no es administrador, redirigir a la página de inicio
  useEffect(() => {
    if (location.pathname === "/Admin") {
      if (
        clienteLogged === null ||
        !clienteLogged.datoscliente.cuenta.email !== "admin@fullmetalstore.es"
      ) {
        navigate("/");
      }
    }
  }, [clienteLogged]);
  //#endregion
  return (
    <div
      className={`flex flex-col min-h-screen ${
        darkMode ? "bg-blue-300" : "bg-gray-500"
      }`}
    >
      <Header />

      <div className="container mx-auto flex-grow">
        <div className="flex flex-wrap h-full">
          <div className="w-full h-full px-1">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <div className="py-2">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
