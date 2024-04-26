import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
  useLocation
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

const routerObjects = createBrowserRouter([
  {
    element: <Layout />,
    loader: tiendaRESTService.RecuperarGeneros,
    children: [
      {path: "/", element: <Navigate to="/Tienda/Albumes" />},
      {path: "/Tienda/Albumes", element: <Albumes />},
      { path: "/Cliente/RegistroOk/:email", element: <RegistroOk /> }],
  },
]);
function App() {
  return (
    <DarkModeProvider>
      <AppContent />
    </DarkModeProvider>
  );
}

function AppContent() {
  const {darkMode} = useDarkMode();
  return (
    <div id='contenedor'className={darkMode ? "purple-light": "purple-dark"}>
      <ClienteLoggedProvider>
        <ItemsCarroProvider>
          <RouterProvider router={routerObjects} />
        </ItemsCarroProvider>
      </ClienteLoggedProvider>
    </div>
  );
}

export default App;
