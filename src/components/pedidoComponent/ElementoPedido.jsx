import {
  Card,
  CardHeader,
  Image,
  Button
} from "@nextui-org/react";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
function ElementoPedido(props) {
    const {album, cantidad} = props.item;
    console.log(props.item);
    const { dispatch }= useItemsCarroContext();
    function subtotalAlbum(){
        return album.precio * cantidad;
    }
    function eliminarElementoPedido(){
        console.log("Eliminando elemento pedido:" + album.nombre);
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
            alt="nextui logo"
            height={40}
            radius="sm"
            src={album.imagenPortada}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">{album.nombre} X {cantidad}</p>
            <p className="text-small text-red-500">{subtotalAlbum()} €</p>
          </div>
          <div className="flex flex-col">
            <Button
              color="error"
              size="small"
              variant="text"
              onClick={eliminarElementoPedido}
            >
              X
            </Button>
            </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ElementoPedido;
