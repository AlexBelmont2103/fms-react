import { useState, useEffect } from "react";
import {useClienteLoggedContext} from "../../contextProviders/clienteLoggedContext";

function DatosCliente() {
//#region variables de estado
const { clienteLogged, dispatch } = useClienteLoggedContext();
const [copiaCliente, setCopiaCliente] = useState();
//#endregion

//#region funciones

//#endregion

//#region efectos

//#endregion

  return (
    <>
    </>
  );
}

export default DatosCliente;