import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { Form } from "formik";
import DatosEntrega from "./DatosEntrega";
function PedidoForm() {
  //#region --------------- state manejado por el componente (global por context-api o local) ------------------
  //-------recuperacion del global-state items del pedido------
  let { itemsCarro, dispatch } = useItemsCarroContext();
  let { clienteLogged } = useClienteLoggedContext();
  const navigate = useNavigate();

  return (
    <>
      <Form>
        <DatosEntrega />
      </Form>
    </>
  );
}

export default PedidoForm;
