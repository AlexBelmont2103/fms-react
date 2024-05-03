import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";

function Layout() {
  const { clienteLogged } = useClienteLoggedContext();
  const { darkMode } = useDarkMode();
  //let _listaCategorias = useLoaderData();
  //console.log("_listaCategorias: ", _listaCategorias);
  let _location = useLocation();
  return (
    <div className={darkMode ? "bg-white" : "bg-gray-800"}>
      <Header />
      <div className="container mx-auto">
        <div className="flex flex-wrap">
          <div className="w-full">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
