import { useState } from "react";
import { Card, CardHeader, Button, Chip } from "@nextui-org/react";
import clienteRESTService from "../../servicios/restCliente";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";

function MiniDireccion({ direccion, setDireccionModal, setOperacion, onOpenChange}) {
  //#region variables de estado
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  //#endregion

  //#region funciones
  async function eliminarDireccion() {
    console.log("Eliminar direccion", direccion._id);
    let response = await clienteRESTService.eliminarDireccion(direccion._id,clienteLogged.tokensesion);
    if (response.codigo === 0) {
      console.log("Direccion eliminada correctamente...");
      dispatch({
        type: "CLIENTE_LOGIN",
        payload: {
          datoscliente: response.datoscliente,
          tokensesion: response.tokensesion,
        }
      });
    } else {
      console.log("Error al intentar eliminar direccion...",response.error);
    }
  }
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
          <p className="text-small text-default-500">
            {direccion.codigoPostal}
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
              <Chip color="danger" as={Button} onPress={eliminarDireccion}>Eliminar direccion</Chip>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
export default MiniDireccion;
