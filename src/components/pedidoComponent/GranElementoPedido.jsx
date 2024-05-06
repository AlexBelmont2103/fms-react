import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Chip,
  Button,
} from "@nextui-org/react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useEffect } from "react";
function GranElementoPedido(props) {
  const { album, cantidad } = props.item;
  console.log(props.item);
  const { dispatch } = useItemsCarroContext();
  function subtotalAlbum() {
    return (album.precio * cantidad).toFixed(2);
  }
  function sumarElementoPedido() {
    console.log("Sumando elemento pedido:" + album.nombre);
    dispatch({
      type: "ADD_NUEVO_ALBUM",
      payload: { album: album },
    });
  }
  function restarElementoPedido() {
    console.log("Restando elemento pedido:" + album.nombre);
    dispatch({
      type: "RESTAR_CANTIDAD_ALBUM",
      payload: { _id: album._id },
    });
  }
  function eliminarElementoPedido() {
    console.log("Eliminando elemento pedido:" + album.nombre);
    dispatch({
      type: "ELIMINAR_ALBUM",
      payload: { _id: album._id },
    });
  }

  return (
    <div className="px-5 py-2">
      <Card className="py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">
            {album.nombre} X {cantidad}
          </p>
          <small className="text-red-800">{subtotalAlbum()} €</small>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Card background"
            className="object-cover rounded-xl"
            src={album.imagenPortada}
            width={270}
          />
        </CardBody>
        <CardFooter className="flex justify-between overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          <div>
            <Chip
              as={Button}
              color="primary"
              size="lg"
              variant="shadow"
              onClick={sumarElementoPedido}
            >
              +
            </Chip>
          </div>
          <div>
            <Chip
              as={Button}
              color="warning"
              size="lg"
              variant="shadow"
              onClick={restarElementoPedido}
            >
              -
            </Chip>
          </div>
          <div>
            <Chip
              as={Button}
              color="danger"
              size="lg"
              variant="shadow"
              onClick={eliminarElementoPedido}
            >
              X
            </Chip>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default GranElementoPedido;
