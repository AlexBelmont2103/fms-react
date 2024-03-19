import {RouterProvider,createBrowserRouter,Navigate,
} from "react-router-dom";
import { ClienteLoggedProvider } from "./contextProviders/clienteLoggedContext";
import { ItemsCarroProvider } from "./contextProviders/itemsCarroContext";
import Layout from "./components/layoutComponent/Layout";
import RegistroOk from "./components/zonaCliente/RegistroOk";
const routerObjects = createBrowserRouter([{
  element: <Layout />,
  path: "/",
  children:[
    {path:"/Cliente/RegistroOk/:email",element:<RegistroOk/>},
  ]
}]);
function App() {
  return (
    <>
      <ClienteLoggedProvider>
        <ItemsCarroProvider>
          <RouterProvider router={routerObjects} />
        </ItemsCarroProvider>
      </ClienteLoggedProvider>
    </>
  );
}

export default App;
