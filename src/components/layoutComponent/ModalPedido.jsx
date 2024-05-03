import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import PedidoForm from "../pedidoComponent/PedidoForm";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
function ModalPedido() {
  const { clienteLogged } = useClienteLoggedContext();
  const { darkMode } = useDarkMode();
  // Validation schema using Yup
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
  return (
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
        <div>
          <h1>Formulario de Pedido</h1>
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
            <PedidoForm />
          </Formik>
        </div>
      )}
    </div>
  );
}
export default ModalPedido;
