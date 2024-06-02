import { useState } from "react";
import { Card, CardHeader, Button, Chip } from "@nextui-org/react";

function MiniDireccion({ direccion, setDireccionModal, setOperacion, onOpenChange}) {
  //#region variables de estado
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{direccion.calle}</p>
          <p className="text-small text-default-500">
            {direccion.municipio.DMUN50} ({direccion.provincia.PRO})
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-full flex">
            <div className="flex-grow">
              <Chip color="primary" as={Button} onPress={()=>{
                setDireccionModal(direccion);
                setOperacion("Modificar");
                onOpenChange();
              }}>Modificar direccion</Chip>
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex-grow">
              <Chip color="danger" as={Button}>Eliminar direccion</Chip>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
export default MiniDireccion;
