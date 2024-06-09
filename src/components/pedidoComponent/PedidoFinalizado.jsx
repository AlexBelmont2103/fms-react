import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import pedidoRESTService from "../../servicios/restPedido";

function PedidoFinalizado() {
  //#region Variables de estado
  const [pedido, setPedido] = useState({});
  const location = useLocation();
  console.log("Location", location);
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  //#endregion

  //#region Efectos
  //Efecto para recuperar el pedido de la DB
  useEffect(() => {
    console.log("Recuperando pedido");
    //El idPedido se recupera en dicho parametro de la url

    const idPedido = location.search.split("=")[1];
    console.log("idPedido", idPedido);
    const cogerPedido = async () => {
      try {
        const respuesta = await pedidoRESTService.actualizarPedido(idPedido);
        console.log("Pedido recuperado", respuesta);
        setPedido(respuesta.pedido);
        console.log("Pedido", pedido);
        //Actualizar el cliente logueado
        dispatch({
          type: "CLIENTE_LOGIN",
          payload: {
            datoscliente: respuesta.datoscliente,
            tokensesion: respuesta.tokensesion,
          },
        });
      } catch (error) {
        console.log("Error al intentar recuperar el pedido", error);
      }
    };
    cogerPedido();
  }, []);
  //#endregion
  // Si el pedido aún no ha sido cargado, renderizar un componente de carga
  if (!pedido) {
    return <div>Cargando...</div>;
  } else {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h1 className="text-4xl font-bold">Pedido finalizado</h1>
        <h2 className="text-2xl text-gray-600">Gracias por tu compra</h2>
        <h3 className="text-xl font-semibold">Detalles del pedido</h3>
        <p className="text-lg text-gray-500">Id: {pedido.id}</p>
        <p className="text-lg text-gray-500">Fecha: {pedido.fecha}</p>
        <p className="text-lg text-gray-500">Estado: {pedido.estado}</p>
        <p className="text-lg text-gray-500">Total: {pedido.total} €</p>
      </div>
    );
  }
}

export default PedidoFinalizado;
