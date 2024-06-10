import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardFooter,CardBody, Image, Button } from "@nextui-org/react";
import tiendaRESTService from "../../servicios/restTienda";
import clienteRESTService from "../../servicios/restCliente";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import BotonFavorito from "./BotonFavorito";
function CardAlbum({ album }) {
  //#region variables de estado
  const { itemsCarro, dispatch } = useItemsCarroContext();
  const [imagenesSpotify, setImagenSpotify] = useState([]);
  const { clienteLogged } = useClienteLoggedContext();
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
  //Efecto para comparar si el álbum es favorito

  //#endregion

  return (
    <div key={album._id}>
      <Card className="col-span-12 sm:col-span-4 h-[300px]">
        <Link to={`/Tienda/Album/${album._id}`}>
          <div className="relative w-full h-full">
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src={album.imagenPortada}
            />
          </div>
        </Link>
        <CardFooter className="overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)]">
          <div className="flex flex-col justify-end">
            <div className="py-2">
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
            </div>
            <div className="py-2">
              <BotonFavorito album={album} />
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CardAlbum;
