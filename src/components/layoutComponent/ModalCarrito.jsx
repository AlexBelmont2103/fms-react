import { Link } from "react-router-dom";
import { Button } from "@nextui-org/react";
import * as Yup from "yup";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import ElementoPedido from "../pedidoComponent/ElementoPedido";
import { useEffect } from "react";
function ModalCarrito(props) {
  const { itemsCarro } = useItemsCarroContext();
  const { darkMode } = useDarkMode();
  function calcularTotalCarro() {
    let totalRaw = itemsCarro.reduce(
      (total, item) => total + item.album.precio * item.cantidad,
      0
    );
    return totalRaw.toFixed(2);
  }
  useEffect(() => {
    console.log("Calculando total");
    calcularTotalCarro();
  }, [itemsCarro]);
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
          <div className="px-5">
            <h1>Resumen del carrito</h1>
          </div>

          {itemsCarro.map((item) => (
            <ElementoPedido key={item.album._id} item={item} />
          ))}
          <div>
            <span className="px-5">Total: {calcularTotalCarro()} €</span>
          </div>
          <div className="flex justify-between">
            <div className="px-5">
              <Button
                as={Link}
                to="/Pedido/MostrarPedido"
                color="primary"
                variant="shadow"
                onClick={props.onOpenChange}
              >
                Tramitar Pedido
              </Button>
            </div>
            <div className="px-5">
              <Button
                color="secondary"
                variant="solid"
                onPress={props.onOpenChange}
              >
                Seguir comprando
              </Button>
            </div>
          </div>
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
