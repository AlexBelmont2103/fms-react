import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "@nextui-org/react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import GranElementoPedido from "./GranElementoPedido";
import DatosEntrega from "./DatosEntrega";
import DatosFactura from "./DatosFactura";
import DatosPago from "./DatosPago";
import pedidoRESTService from "../../servicios/restPedido";
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
    nombreEnvio: Yup.string().required("Campo requerido: Nombre"),
    apellidosEnvio: Yup.string().required("Campo requerido: Apellidos"),
    telefonoContacto: Yup.string().required("Campo requerido: Teléfono"),
    emailEnvio: Yup.string()
      .email("Email inválido")
      .required("Campo requerido: Email"),
    direccionEnvio: Yup.object()
      .shape({
        calle: Yup.string().required("Campo requerido: Calle"),
        municipio: Yup.object()
          .shape({
            CMUM: Yup.string().required("Campo requerido: CMUM"),
            CPRO: Yup.string().required("Campo requerido: CPRO"),
            CUN: Yup.string().required("Campo requerido: CUN"),
            DMUN50: Yup.string().required("Campo requerido: DMUN50"),
          })
          .required("Campo requerido: Municipio"),
        provincia: Yup.object()
          .shape({
            CPRO: Yup.string().required("Campo requerido: CPRO"),
            PRO: Yup.string().required("Campo requerido: PRO"),
          })
          .required("Campo requerido: Provincia"),
        pais: Yup.string().required("Campo requerido: País"),
        cp: Yup.string().required("Campo requerido: CP"),
      })
      .required("Campo requerido: Dirección"),
    nombreFactura: Yup.string().required("Campo requerido: Nombre"),
    apellidosFactura: Yup.string().required("Campo requerido: Apellidos"),
    direccionFactura: Yup.object()
      .shape({
        calle: Yup.string().required("Campo requerido: Calle"),
        municipio: Yup.object()
          .shape({
            CMUM: Yup.string().required("Campo requerido: CMUM"),
            CPRO: Yup.string().required("Campo requerido: CPRO"),
            CUN: Yup.string().required("Campo requerido: CUN"),
            DMUN50: Yup.string().required("Campo requerido: DMUN50"),
          })
          .required("Campo requerido: Municipio"),
        provincia: Yup.object()
          .shape({
            CPRO: Yup.string().required("Campo requerido: CPRO facturación"),
            PRO: Yup.string().required("Campo requerido: PRO facturación"),
          })
          .required("Campo requerido: Provincia"),
        pais: Yup.string().required("Campo requerido: País"),
        cp: Yup.string().required("Campo requerido: CP"),
      })
      .required("Campo requerido: Dirección"),
    tipoPago: Yup.string().required("Campo requerido: Tipo de pago"),
    numerocard: Yup.string()
      .length(16, "Debe tener 16 dígitos")
      .required("Campo requerido: Número de tarjeta"),
    mescard: Yup.string().required("Campo requerido: Mes"),
    aniocard: Yup.string().required("Campo requerido: Año"),
    cvv: Yup.string()
      .length(3, "Debe tener 3 dígitos")
      .required("Campo requerido: CVV"),
    nombrebancocard: Yup.string().required(
      "Campo requerido: Nombre de tarjeta"
    ),
    subTotal: Yup.number().required("Campo requerido: Subtotal"),
    gastosEnvio: Yup.number().required("Campo requerido: Gastos de envío"),
    total: Yup.number().required("Campo requerido: Total"),
  });
  const [pedido, setPedido] = useState({
    nombreEnvio: "",
    apellidosEnvio: "",
    telefonoContacto: "",
    emailEnvio: "",
    ElementosPedido: itemsCarro,
    direccionEnvio: {
      calle: "",
      municipio: {
        CMUM: "",
        CPRO: "",
        CUN: "",
        DMUN50: "",
      },
      provincia: {
        CPRO: "",
        PRO: "",
      },
      pais: "",
      cp: "",
    },
    nombreFactura: "",
    apellidosFactura: "",
    direccionFactura: {
      calle: "",
      municipio: {
        CMUM: "",
        CPRO: "",
        CUN: "",
        DMUN50: "",
      },
      provincia: {
        CPRO: "",
        PRO: "",
      },
      pais: "",
      cp: "",
    },
    tipoPago: "pagoTarjeta",
    numerocard: "4242424242424242",
    mescard: "",
    aniocard: "",
    cvv: "",
    nombrebancocard: "",
    subTotal: 0,
    gastosEnvio: 0,
    total: 0,
  });
  //#endregion
  //#region Funciones
  function handleChange(ev) {
    setPedido({
      ...pedido,
      [ev.target.name]: ev.target.value,
    });
  }
  const finalizarPedido = async (ev) => {
    ev.preventDefault();
    console.log(pedido);
    try {
      await validationSchema.validate(pedido);
      const token = clienteLogged.tokensesion;
      if(pedido.tipoPago === "pagoPaypal"){
        const _respuesta = await pedidoRESTService.finalizarPedido(pedido, token);
        console.log(_respuesta.approval_url);
        dispatch({ type: "VACIAR_CARRITO" });
        window.open(_respuesta.approval_url, "_blank");
      }else{
        const _respuesta = await pedidoRESTService.finalizarPedido(pedido, token);
        console.log(_respuesta.return_url);
        // Aquí puedes manejar los datos
        dispatch({ type: "VACIAR_CARRITO" });
        navigate(_respuesta.return_url);
      }

    } catch (error) {
      console.log(error);
      // manejar el error...
    }
  };
  const calcularSubTotal = async () => {
    let subTotal = 0;
    itemsCarro.forEach((item) => {
      subTotal += item.album.precio * item.cantidad;
    });
    return Number(subTotal).toFixed(2);
  };

  const calcularGastosEnvio = async () => {
    let gastosEnvioRaw = 0;
    switch (pedido.direccionEnvio.provincia.CPRO) {
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
    return Number(gastosEnvioRaw).toFixed(2);
  };

  const calcularTotal = async (subTotal, gastosEnvio) => {
    let total = 0;
    total = Number(subTotal) + Number(gastosEnvio);
    return total.toFixed(2);
  };
  //#endregion
  //#region Efectos
  useEffect(() => {
    const calcularValores = async () => {
      const subTotal = Number(await calcularSubTotal());
      setSubTotalPedido(subTotal);

      const gastosEnvio = Number(await calcularGastosEnvio());
      setGastosEnvio(gastosEnvio);

      const total = Number(await calcularTotal(subTotal, gastosEnvio));
      setTotalPedido(total);
    };

    calcularValores();
  }, [itemsCarro, pedido.direccionEnvio]);
  //Efecto para settear los datos de envío si el cliente está logueado
  useEffect(() => {
    if (clienteLogged) {
      const direccionPrincipal = clienteLogged.datoscliente.direcciones.find(
        (dir) => dir.esPrincipal
      );
      setPedido({
        ...pedido,
        nombreEnvio: clienteLogged.datoscliente.nombre,
        apellidosEnvio: clienteLogged.datoscliente.apellidos,
        telefonoContacto: clienteLogged.datoscliente.telefono,
        emailEnvio: clienteLogged.datoscliente.cuenta.email,
        direccionEnvio: {
          ...direccionPrincipal,
        },
        nombreFactura: clienteLogged.datoscliente.nombre,
        apellidosFactura: clienteLogged.datoscliente.apellidos,
        direccionFactura: {
          ...direccionPrincipal,
        },
      });
    }
  }, [clienteLogged]);
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
                <form onSubmit={finalizarPedido}>
                  <div>
                    <DatosEntrega
                      pedido={pedido}
                      setPedido={setPedido}
                      onChange={handleChange}
                    />
                    <DatosFactura
                      pedido={pedido}
                      setPedido={setPedido}
                      onChange={handleChange}
                    />
                    <DatosPago
                      pedido={pedido}
                      setPedido={setPedido}
                      onChange={handleChange}
                    />
                    <div className="p-2">
                      <Button color="primary" variant="shadow" type="submit">
                        Finalizar Pedido
                      </Button>
                    </div>
                  </div>
                </form>
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
