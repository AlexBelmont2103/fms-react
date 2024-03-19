import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";

function Layout() {
  const {clienteLogged} = useClienteLoggedContext();
  console.log("Layout.js - clienteLogged: ", clienteLogged);
  let _listaCategorias = useLoaderData();
  console.log("Layout.js - _listaCategorias: ", _listaCategorias);
  let _location=useLocation();
  console.log("Layout.js - _location: ", _location);
  return (
    <>
        <Header />
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                <div className="w-full">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
        <Footer />
    </>
);
}

export default Layout;