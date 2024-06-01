import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ClienteLoggedProvider } from "./contextProviders/clienteLoggedContext";
import { ItemsCarroProvider } from "./contextProviders/itemsCarroContext";
import Layout from "./components/layoutComponent/Layout";
import RegistroOk from "./components/zonaCliente/RegistroOk";
import Albumes from "./components/zonaTienda/Albumes";
import {
  DarkModeProvider,
  useDarkMode,
} from "./contextProviders/darkModeContext";
import tiendaRESTService from "./servicios/restTienda";
import pedidoRESTService from "./servicios/restPedido";
import adminRESTService from "./servicios/restAdmin";
import PedidoForm from "./components/pedidoComponent/PedidoForm";
import PedidoFinalizado from "./components/pedidoComponent/PedidoFinalizado";
import InicioPanel from "./components/panelClienteComponent/InicioPanel";
import DatosCliente from "./components/panelClienteComponent/DatosCliente";
import DireccionesCliente from "./components/panelClienteComponent/DireccionesCliente";
import PedidosCliente from "./components/panelClienteComponent/PedidosCliente";
import PanelAdmin from "./components/panelAdminComponent/PanelAdmin";

const routerObjects = createBrowserRouter([
  {
    element: <Layout />,
    loader: tiendaRESTService.RecuperarGeneros,
    children: [
      { path: "/", element: <Navigate to="/Tienda/Albumes" /> },
      { path: "/Tienda/Albumes", element: <Albumes /> },
      { path: "/Cliente/RegistroOk/:email", element: <RegistroOk /> },
      {
        path: "/Pedido/MostrarPedido",
        element: <PedidoForm />,
        loader: pedidoRESTService.recuperarProvincias,
      },
      {path:"/Pedido/PedidoFinalizado",element:<PedidoFinalizado/>},
      {path:"/Cliente/Panel/InicioPanel",element:<InicioPanel/>},
      {path:"/Cliente/Panel/DatosCliente",element:<DatosCliente/>},
      {path:"/Cliente/Panel/DireccionesCliente",element:<DireccionesCliente/>},
      {path:"/Cliente/Panel/PedidosCliente",element:<PedidosCliente/>},
    ],
  },
  {element:<PanelAdmin/>,loader:adminRESTService.recuperarColecciones,path:"/Admin/PanelAdmin"}
]
);
function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

function AppContent() {
  const { darkMode } = useDarkMode();
  return (
    <div
      id="contenedor"
      className={
        darkMode
          ? "purple-light w-full h-full flex flex-col min-h-screen"
          : "purple-dark w-full h-full flex flex-col min-h-screen"
      }
    >
      <ClienteLoggedProvider>
        <ItemsCarroProvider>
          <RouterProvider router={routerObjects} />
        </ItemsCarroProvider>
      </ClienteLoggedProvider>
    </div>
  );
}

export default App;
