import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import DatosCliente from "./DatosCliente";
import DireccionesCliente from "./DireccionesCliente";
import PedidosCliente from "./PedidosCliente";

function PanelCliente() {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const { clienteLogged } = useClienteLoggedContext();
  const [cliente, setCliente] = useState(clienteLogged.datoscliente);
  const [direcciones, setDirecciones] = useState(cliente.direcciones);
  const [pedidos, setPedidos] = useState(cliente.pedidos);
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos
  useEffect(() => {
    setCliente(clienteLogged.datoscliente);
    setDirecciones(cliente.direcciones);
    setPedidos(cliente.pedidos);
  }, [clienteLogged]);
  //#endregion
  return (
    <div className="mt-4">
      {clienteLogged != null && (
              <Accordion defaultExpandedKeys={["1"]} variant="splitted">
              <AccordionItem key="1" aria-label="Accordion 1" title="Mis datos">
                <DatosCliente cliente={cliente} />
              </AccordionItem>
              <AccordionItem key="2" aria-label="Accordion 2" title="Mis direcciones">
                <DireccionesCliente direcciones={direcciones} />
              </AccordionItem>
              <AccordionItem key="3" aria-label="Accordion 3" title="Mis pedidos">
                <PedidosCliente pedidos={pedidos} />
              </AccordionItem>
              <AccordionItem key="4" aria-label="Accordion 4" title="Mis favoritos">
                <div className={darkMode ? "text-black":"text-white"}>
                  <p>Proximamente...</p>
                </div>
              </AccordionItem>
            </Accordion>)
        }

    </div>
  );
}
export default PanelCliente;
