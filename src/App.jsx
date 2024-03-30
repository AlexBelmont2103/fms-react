import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { ClienteLoggedProvider } from "./contextProviders/clienteLoggedContext";
import { ItemsCarroProvider } from "./contextProviders/itemsCarroContext";
import Layout from "./components/layoutComponent/Layout";
import RegistroOk from "./components/zonaCliente/RegistroOk";
import {
  DarkModeProvider,
  useDarkMode,
} from "./contextProviders/darkModeContext";

const routerObjects = createBrowserRouter([
  {
    element: <Layout />,
    path: "/",
    children: [{ path: "/Cliente/RegistroOk/:email", element: <RegistroOk /> }],
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
  console.log('darkMode en appContent', darkMode);
  return (
    <div id='contenedor' className={`${darkMode ? "dark" : "light"}`}>
      <ClienteLoggedProvider>
        <ItemsCarroProvider>
          <RouterProvider router={routerObjects} />
        </ItemsCarroProvider>
      </ClienteLoggedProvider>
    </div>
  );
}

export default App;
