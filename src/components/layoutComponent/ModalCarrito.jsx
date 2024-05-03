import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import ElementoPedido from "../pedidoComponent/ElementoPedido";
function ModalCarrito() {
  const { itemsCarro } = useItemsCarroContext();
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
    <>
      {itemsCarro.length > 0 ? (
        <div
          className={
            darkMode
              ? "purple-light bg-white text-black px-5 py-5"
              : "purple-dark bg-gray-800 text-white px-5 py-5"
          }
        >
          <h1>Resumen del carrito</h1>
          {itemsCarro.map((item) => (
            <ElementoPedido key={item.album._id} item={item} />
          ))}
        </div>
      ) : (
        <div
          className={
            darkMode
              ? "purple-light bg-white text-black px-5 py-5"
              : "purple-dark bg-gray-800 text-white px-5 py-5"
          }
        >
          <h1 className="text-2xl">No hay elementos en el carrito</h1>
        </div>
      )}
    </>
  );
}
export default ModalCarrito;
