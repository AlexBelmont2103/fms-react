import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import pedidoRESTService from "../../servicios/restPedido";

function PedidoFinalizado() {
  //#region Variables de estado
  const [pedido, setPedido] = useState({});
  const location = useLocation();
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
  }else{
    return(
      <div>
        <h1>Pedido finalizado</h1>
        <p>El pedido se ha realizado correctamente</p>
        <p>El número de pedido es: {pedido._id}</p>
      </div>
    )
  }
}

export default PedidoFinalizado;
