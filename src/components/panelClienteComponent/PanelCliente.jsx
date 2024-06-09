import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import DatosCliente from "./DatosCliente";
import DireccionesCliente from "./DireccionesCliente";
import PedidosCliente from "./PedidosCliente";
import CardAlbum from "../zonaTienda/CardAlbum";

function PanelCliente() {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const { clienteLogged } = useClienteLoggedContext();
  const [cliente, setCliente] = useState(clienteLogged.datoscliente);
  const [direcciones, setDirecciones] = useState(
    clienteLogged.datoscliente.direcciones
  );
  const [pedidos, setPedidos] = useState(clienteLogged.datoscliente.pedidos);
  const [favoritos, setFavoritos] = useState(
    clienteLogged.datoscliente.favoritos
  );
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos
  useEffect(() => {
    setCliente(clienteLogged.datoscliente);
    setDirecciones(clienteLogged.datoscliente.direcciones);
    setPedidos(clienteLogged.datoscliente.pedidos);
    setFavoritos(clienteLogged.datoscliente.favoritos);
  }, [clienteLogged]);
  //#endregion
  console.log("cliente", cliente);
  return (
    <div className={darkMode ? "mt-4 text-black" : "mt-4 text-white"}>
      {clienteLogged != null && (
        <Accordion
          defaultExpandedKeys={["1"]}
          variant="splitted"
          selectionBehavior="replace"
        >
          <AccordionItem key="1" aria-label="Accordion 1" title="Mis datos">
            <DatosCliente cliente={cliente} />
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Accordion 2"
            title="Mis direcciones"
          >
            <DireccionesCliente direcciones={direcciones} />
          </AccordionItem>
          <AccordionItem key="3" aria-label="Accordion 3" title="Mis pedidos">
            <PedidosCliente pedidos={pedidos} />
          </AccordionItem>
          <AccordionItem key="4" aria-label="Accordion 4" title="Mis favoritos">
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {favoritos.map((album) => (
                <div
                  
                  key={album._id}
                >
                  <CardAlbum album={album} />
                </div>
              ))}
            </div>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}
export default PanelCliente;
