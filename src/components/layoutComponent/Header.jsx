import { Divider } from "@nextui-org/react";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import InfoCliente from "./InfoCliente";
import BarraNavegacion from "./BarraNavegacion";

function Header() {
  const { darkMode } = useDarkMode();
  return (
    <header
      className={darkMode ? "purple-light" : "purple-dark"}
      style={{ borderRadius: "10px" }}
    >
      <InfoCliente />
      <div className="container flex mx-auto">
        <Divider className="py-1" />
      </div>
      <BarraNavegacion />
    </header>
  );
}

export default Header;
