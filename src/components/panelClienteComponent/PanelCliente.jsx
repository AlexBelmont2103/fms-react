import { useState, useEffect } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import DatosCliente from "./DatosCliente";
import DireccionesCliente from "./DireccionesCliente";
import PedidosCliente from "./PedidosCliente";


function PanelCliente() {
  //#region variables de estado

  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion

  return (
    <div className="mt-4 ">
      <Accordion variant="splitted">
        <AccordionItem key="1" aria-label="Accordion 1" title="Mis datos">
          <DatosCliente />
        </AccordionItem>
        <AccordionItem key="2" aria-label="Accordion 2" title="Mis direcciones">
          <DireccionesCliente />
        </AccordionItem>
        <AccordionItem key="3" aria-label="Accordion 3" title="Mis pedidos">
          <PedidosCliente />
        </AccordionItem>
      </Accordion>
    </div>
  );
}
export default PanelCliente;
