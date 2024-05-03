import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Button} from "@nextui-org/react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { Form, useFormikContext } from "formik";
import DatosEntrega from "./DatosEntrega";
function PedidoForm() {
  let { itemsCarro, dispatch } = useItemsCarroContext();
  let { clienteLogged } = useClienteLoggedContext();
  const { values } = useFormikContext();
  const navigate = useNavigate();
  function finalizarPedido(ev){
    ev.preventDefault();
    console.log("Pedido finalizado");
    console.log(values);
  }
  return (
    <>
      <Form onSubmit={finalizarPedido}>
        <DatosEntrega />
        <div className="py-5 px-5">
          <Button
            color="primary"
            type="submit"
          >
            Continuar
          </Button>
        </div>
      </Form>
    </>
  );
}

export default PedidoForm;
