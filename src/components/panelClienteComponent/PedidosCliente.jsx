import { useState, useEffect } from "react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import MiniPedido from "./MiniPedido";

function PedidosCliente({ pedidos }) {
  //#region variables de estado
  const {clienteLogged} = useClienteLoggedContext();
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion
  console.log("pedidos", pedidos);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pedidos.map((pedido) => (
        <div key={pedido._id}>
          <MiniPedido pedido={pedido} />
        </div>
      ))}
    </div>
  );
}
export default PedidosCliente;
