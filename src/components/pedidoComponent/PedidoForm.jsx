import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { Formik, Form, useFormik } from "formik";
import GranElementoPedido from "./GranElementoPedido";
import DatosEntrega from "./DatosEntrega";
import DatosFactura from "./DatosFactura";
import DatosPago from "./DatosPago";
function PedidoForm() {
  //#region Variables de estado
  const { darkMode } = useDarkMode();
  const { itemsCarro, dispatch } = useItemsCarroContext();
  const { clienteLogged } = useClienteLoggedContext();
  const [subTotalPedido, setSubTotalPedido] = useState(0);
  const [gastosEnvio, setGastosEnvio] = useState(0);
  const [totalPedido, setTotalPedido] = useState(0);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    calle: Yup.string().required("Campo requerido"),
    municipio: Yup.object().shape({
      CMUM: Yup.string().required("Campo requerido"),
      CPRO: Yup.string().required("Campo requerido"),
      CUN: Yup.string().required("Campo requerido"),
      DMUN50: Yup.string().required("Campo requerido"),
    }),
    provincia: Yup.object().shape({
      CCOM: Yup.string().required("Campo requerido"),
      CPRO: Yup.string().required("Campo requerido"),
      PRO: Yup.string().required("Campo requerido"),
    }),
    pais: Yup.string().required("Campo requerido"),
    cp: Yup.string().required("Campo requerido"),
    nombreEnvio: Yup.string().required("Campo requerido"),
    apellidosEnvio: Yup.string().required("Campo requerido"),
    telefonoContacto: Yup.string().required("Campo requerido"),
    emailEnvio: Yup.string()
      .email("Email inválido")
      .required("Campo requerido"),
    nombreFactura: Yup.string().required("Campo requerido"),
    apellidosFactura: Yup.string().required("Campo requerido"),
    calleFactura: Yup.string().required("Campo requerido"),
    municipioFactura: Yup.object().shape({
      CMUM: Yup.string().required("Campo requerido"),
      CPRO: Yup.string().required("Campo requerido"),
      CUN: Yup.string().required("Campo requerido"),
      DMUN50: Yup.string().required("Campo requerido"),
    }),
    provinciaFactura: Yup.object().shape({
      CCOM: Yup.string().required("Campo requerido"),
      CPRO: Yup.string().required("Campo requerido"),
      PRO: Yup.string().required("Campo requerido"),
    }),
    paisFactura: Yup.string().required("Campo requerido"),
    cpFactura: Yup.string().required("Campo requerido"),
    tipoPago: Yup.string().required("Campo requerido"),
    numerocard: Yup.string().required("Campo requerido"),
    mescard: Yup.string().required("Campo requerido"),
    aniocard: Yup.string().required("Campo requerido"),
    cvv: Yup.string().required("Campo requerido"),
    nombrebancocard: Yup.string().required("Campo requerido"),
  });
  const formik = useFormik({
    initialValues: {
      calle: "",
      municipio: {
        CMUM: "",
        CPRO: "",
        CUN: "",
        DMUN50: "",
      },
      provincia: {
        CCOM: "",
        CPRO: "",
        PRO: "",
      },
      pais: "",
      cp: "",
      nombreEnvio: "",
      apellidosEnvio: "",
      telefonoContacto: "",
      emailEnvio: "",
      nombreFactura: "",
      apellidosFactura: "",
      calleFactura: "",
      municipioFactura: {
        CMUM: "",
        CPRO: "",
        CUN: "",
        DMUN50: "",
      },
      provinciaFactura: {
        CCOM: "",
        CPRO: "",
        PRO: "",
      },
      paisFactura: "",
      cpFactura: "",
      tipoPago: "pagoTarjeta",
      numerocard: "4242424242424242",
      mescard: "",
      aniocard: "",
      cvv: "",
      nombrebancocard: "",
    },
    validationSchema: validationSchema ,
    onSubmit: finalizarPedido,
    isValid: true,
  });
  //#endregion
  //#region Funciones
  function finalizarPedido() {
    if (formik.isValid) {
      console.log("Finalizando pedido: ",formik.values);
    }else{
      console.log("Formulario inválido");
    
    }
  }
  function calcularSubTotalCarro() {
    let totalRaw = itemsCarro.reduce(
      (total, item) => total + item.album.precio * item.cantidad,
      0
    );
    setSubTotalPedido(totalRaw);
  }
  function calcularGastosEnvio() {
    let gastosEnvioRaw = 0;
    switch (formik.values.provincia.CPRO) {
      case "07":
        gastosEnvioRaw = 3;
        break;
      case "35":
      case "38":
      case "51":
      case "52":
        gastosEnvioRaw = 5;
        break;
      default:
        gastosEnvioRaw = 2;
        break;
    }

    setGastosEnvio(gastosEnvioRaw);
  }
  function calcularTotalPedido() {
    let totalPedidoRaw = subTotalPedido + gastosEnvio;
    setTotalPedido(totalPedidoRaw);
  }
  //#endregion
  //#region Efectos
  useEffect(() => {
    calcularSubTotalCarro();
    calcularGastosEnvio();
    calcularTotalPedido();
  }, [itemsCarro]);
  //#endregion
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
          <div className="flex flex-row justify-around">
            <div className="p-2 flex flex-row">
              <div className="p-2">
                <h1>Detalles del pedido</h1>
                <Formik
                  initialValues={formik.values}
                  validationSchema={validationSchema}
                  onSubmit={formik.handleSubmit}
                >
                  
                  <Form>
                    <div>
                      <DatosEntrega values={formik.values} />
                      <DatosFactura values={formik.values} />
                      <DatosPago values={formik.values} />
                      <div className="p-2">
                        <Button color="primary" variant="shadow" type="submit">
                          Finalizar Pedido
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className="p-2">
              <div className="px-5">
                <h1>Resumen del pedido</h1>
              </div>
              <div>
                {itemsCarro.map((item) => (
                  <GranElementoPedido key={item.album._id} item={item} />
                ))}
              </div>
              <div className="px-5">
                <span className="text-danger">
                  Subtotal: {subTotalPedido} €
                </span>
              </div>
              <div className="px-5">
                <span className="text-danger">
                  Gastos de envío: {gastosEnvio} €
                </span>
              </div>
              <div className="px-5">
                <span className="text-danger">Total: {totalPedido} €</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PedidoForm;
