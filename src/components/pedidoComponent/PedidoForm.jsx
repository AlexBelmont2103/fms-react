import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { Formik, Form } from "formik";
import ElementoPedido from "./ElementoPedido";
import DatosEntrega from "./DatosEntrega";
function PedidoForm() {
  const { darkMode } = useDarkMode();
  const { itemsCarro, dispatch } = useItemsCarroContext();
  const { clienteLogged } = useClienteLoggedContext();
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    calle: Yup.string().required("Campo requerido"),
    municipio: Yup.string().required("Campo requerido"),
    provincia: Yup.string().required("Campo requerido"),
    pais: Yup.string().required("Campo requerido"),
    cp: Yup.string().required("Campo requerido"),
    nombreEnvio: Yup.string().required("Campo requerido"),
    apellidosEnvio: Yup.string().required("Campo requerido"),
    telefonoContacto: Yup.string().required("Campo requerido"),
    emailEnvio: Yup.string()
      .email("Email inválido")
      .required("Campo requerido"),
    otrosDatos: Yup.string(),
    nombreFactura: Yup.string().required("Campo requerido"),
    docFactura: Yup.string().required("Campo requerido"),
    callefactura: Yup.string().required("Campo requerido"),
    municipiofactura: Yup.string().required("Campo requerido"),
    provinciafactura: Yup.string().required("Campo requerido"),
    paisfactura: Yup.string().required("Campo requerido"),
    cpfactura: Yup.string().required("Campo requerido"),
    numerocard: Yup.string().required("Campo requerido"),
    mescard: Yup.string().required("Campo requerido"),
    aniocard: Yup.string().required("Campo requerido"),
    cvv: Yup.string().required("Campo requerido"),
    nombrebancocard: Yup.string().required("Campo requerido"),
  });
  function calcularSubTotalCarro() {
    let totalRaw = itemsCarro.reduce(
      (total, item) => total + item.album.precio * item.cantidad,
      0
    );
    return totalRaw.toFixed(2);
  }
  function finalizarPedido(ev) {
    ev.preventDefault();
    console.log("Pedido finalizado");
    console.log(values);
  }
  return (
    <>
      <div
        className={
          darkMode
            ? "purple-light bg-white text-black px-5 py-5"
            : "purple-dark bg-gray-800 text-white px-5 py-5"
        }
      >
        {clienteLogged == null && (
          <div>
            <h1>Debes estar logueado para hacer un pedido</h1>
          </div>
        )}
        {clienteLogged != null && (
          <div className="flex justify-between">
            <div className="flex-col">
              <div className="px-20">
                <h1>Detalles del pedido</h1>
              </div>
              <Formik
                initialValues={{
                  calle: "",
                  municipio: "",
                  provincia: "",
                  pais: "",
                  cp: "",
                  nombreEnvio: "",
                  apellidosEnvio: "",
                  telefonoContacto: "",
                  emailEnvio: "",
                  otrosDatos: "",
                  tipofactura: "facturaempresa",
                  nombreFactura: "",
                  docFactura: "",
                  checkdireccionfactura: "true",
                  callefactura: "",
                  municipiofactura: "",
                  provinciafactura: "",
                  paisfactura: "",
                  cpfactura: "",
                  pagoradios: "pagotarjeta",
                  numerocard: "4242424242424242",
                  mescard: "",
                  aniocard: "",
                  cvv: "",
                  nombrebancocard: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  // Handle form submission
                  console.log(values);
                }}
              >
                <Form onSubmit={finalizarPedido}>
                  <div className="px-20">
                    <DatosEntrega />
                    <div className="py-5 px-5">
                      <Button color="primary" type="submit">
                        Finalizar Pedido
                      </Button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
            <div className="flex-col">
              <div className="px-5">
                <h1>Resumen del pedido</h1>
              </div>

              <div>
                {itemsCarro.map((item) => (
                  <ElementoPedido key={item.album._id} item={item} />
                ))}
              </div>
              <div className="px-5">
                <span className="text-danger">
                  Subtotal: {calcularSubTotalCarro()} €
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PedidoForm;
