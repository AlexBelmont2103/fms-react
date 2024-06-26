import { Card, CardHeader, Image, Chip, Button } from "@nextui-org/react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useEffect } from "react";
function ElementoPedido(props) {
  const { album, cantidad } = props.item;
  console.log(props.item);
  const { dispatch } = useItemsCarroContext();
  function subtotalAlbum() {
    return (album.precio * cantidad).toFixed(2);
  }
  function sumarElementoPedido() {
    if (cantidad < album.stock) {
      dispatch({
        type: "ADD_NUEVO_ALBUM",
        payload: { album: album },
      });
    } else {
      alert("No puedes añadir más álbumes. No hay suficiente stock.");
    }
  }
  function restarElementoPedido() {
    dispatch({
      type: "RESTAR_CANTIDAD_ALBUM",
      payload: { _id: album._id },
    });
  }
  function eliminarElementoPedido() {
    dispatch({
      type: "ELIMINAR_ALBUM",
      payload: { _id: album._id },
    });
  }

  return (
    <div className="px-5 py-2">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt={album.nombre}
            height={40}
            radius="md"
            src={album.imagenPortada}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-xs">
              {album.nombre} X {cantidad}
            </p>
            <p className="text-small text-red-500">{subtotalAlbum()} €</p>
          </div>
          <div className="flex flex-col px-8">
            <div className="flex gap-2">
              <Chip
                as={Button}
                color="primary"
                size="sm"
                variant="shadow"
                disabled={cantidad === album.stock}
                onClick={sumarElementoPedido}
              >
                +
              </Chip>
              <Chip
                as={Button}
                color="warning"
                size="sm"
                variant="shadow"
                onClick={restarElementoPedido}
              >
                -
              </Chip>
              <Chip
                as={Button}
                color="danger"
                size="sm"
                variant="shadow"
                onClick={eliminarElementoPedido}
              >
                X
              </Chip>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ElementoPedido;
