import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import tiendaRESTService from "../../servicios/restTienda";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
function CardAlbum({ album }) {
  //#region variables de estado
  const { itemsCarro, dispatch } = useItemsCarroContext();
  const [imagenesSpotify, setImagenSpotify] = useState([]);
  //#endregion

  //#region funciones
  function añadirAlbumCarro(album) {
    // Buscar el álbum en el carrito
    const itemCarro = itemsCarro.find((item) => item.album.id === album.id);
    const cantidadEnCarro = itemCarro ? itemCarro.cantidad : 0;

    if (album.stock > cantidadEnCarro) {
      // Si hay stock disponible, añadir el álbum al carrito
      dispatch({
        type: "ADD_NUEVO_ALBUM",
        payload: { album },
      });
    } else {
      // Si no hay stock disponible, mostrar una alerta
      alert("No puedes añadir este álbum al carrito. No hay stock disponible.");
    }
  }
  //#endregion

  //#region efectos

  //#endregion

  return (
    <div className="w-full h-full" key={album._id}>
      <Card className="py-4 w-full h-full" isFooterBlurred>
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{album.nombre}</p>
          <small className="text-default-500">{album.numCanciones} Temas</small>
          <Link to={`?artista=${album.artista}`}>
            <h4 className="font-bold text-large" textvalue={album.artista}>
              {album.artista}
            </h4>
          </Link>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Link to={`/Tienda/Album/${album._id}`}>
            <Image
              isZoomed
              alt={"Portada de " + album.nombre}
              className="object-cover rounded-xl w-full h-full"
              src={album.imagenPortada}
              width={270}
              height={270}
            />
          </Link>
        </CardBody>
        <CardFooter className="overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
          {album.stock > 0 ? (
            <Button
              className="w-full text-large"
              variant="shadow"
              color="primary"
              radius="lg"
              size="sm"
              onPress={() => añadirAlbumCarro(album)}
            >
              Comprar
            </Button>
          ) : (
            <Button
              disabled
              className="w-full text-large"
              variant="shadow"
              color="danger"
              radius="lg"
              size="sm"
            >
              Agotado
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default CardAlbum;
