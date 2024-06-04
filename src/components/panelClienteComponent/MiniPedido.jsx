import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import clienteRESTService from "../../servicios/restCliente";
import ElementoPedidoCompletado from "./ElementoPedidoCompletado";
function MiniPedido({ pedido }) {
  //#region variables de estado
  const [pedidoState, setPedidoState] = useState(pedido);
  const [esCancelable, setEsCancelable] = useState(false);
  const [fechaPedido, setFechaPedido] = useState(
    pedido.fechaPedido.split("T")[0]
  );
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useDarkMode();
  //#endregion
  //#region funciones
  async function cancelarPedido() {
    console.log("Cancelar pedido", pedidoState._id);
    let response = await clienteRESTService.cancelarPedido(
      pedidoState._id,
      clienteLogged.tokensesion
    );
    console.log("response", response);
    if (response.codigo === 0) {
      console.log("Pedido cancelado correctamente...");
      setEsCancelable(false);
      dispatch({
        type: "CLIENTE_LOGIN",
        payload: {
          datoscliente: response.datoscliente,
          tokensesion: response.tokensesion,
        },
      });
    } else {
      console.log("Error al intentar cancelar pedido...", response.error);
    }
  }
  //#endregion
  //#region efectos
  //Efecto para determinar si el pedido es cancelable
  useEffect(() => {
    //Comprobamos si el pedido no está entregado o cancelado
    if (
      pedidoState.estadoPedido !== "entregado" &&
      pedidoState.estadoPedido !== "Cancelado"
    ) {
      setEsCancelable(true);
    } else {
      setEsCancelable(false);
    }
  }, []);

  //#endregion

  return (
    <div className={darkMode?"purple-light":"purple-dark"}>
      <div className="mb-1">
        <Card>
          <CardHeader className="flex gap-3 justify-between">
            <div className="flex flex-col">
              <p className="text-md">{pedido._id}</p>
              <p className="text-small text-default-500">{fechaPedido}</p>
              <p className="text-small text-default-500">
                {pedidoState.estadoPedido}
              </p>
              <p className="text-small text-default-500">
                Total: {pedidoState.totalPedido}
              </p>
            </div>
            <div>
              <div>
                {esCancelable && (
                  <div className="flex-grow ">
                    <Chip color="danger" as={Button} onPress={cancelarPedido}>
                      Cancelar Pedido
                    </Chip>
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="mb-1">
        <Popover
          isOpen={isOpen}
          onOpenChange={(open) => setIsOpen(open)}
          placement="right"
        >
          <PopoverTrigger>
            <Button color="primary">Elementos del pedido</Button>
          </PopoverTrigger>
          <PopoverContent className={darkMode?"bg-blue-300":"bg-gray-800"}>
            {pedidoState.elementosPedido.map((elemento) => (
              <div key={elemento._id}>
                <ElementoPedidoCompletado elemento={elemento} />
              </div>
            ))}
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

export default MiniPedido;
