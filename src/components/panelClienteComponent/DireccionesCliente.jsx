import { useState, useEffect } from "react";
import { Divider, Button } from "@nextui-org/react";
import MiniDireccion from "./MiniDireccion";

function DireccionesCliente({ direcciones }) {
  //#region variables de estado

  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion

  return (
    <div>
      <div>
        {direcciones.map((direccion) => (
          <div key={direccion._id} className="flex flex-col">
            <MiniDireccion direccion={direccion} />
          </div>
        ))}
      </div>
      <div className="mt-2">
        <Divider />
      </div>
      <div>
        <Button block color="primary" className="mt-2">
          Añadir dirección
        </Button>
      </div>
    </div>
  );
}
export default DireccionesCliente;
