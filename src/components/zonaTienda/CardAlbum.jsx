import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
import tiendaRESTService from "../../servicios/restTienda";
import clienteRESTService from "../../servicios/restCliente";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import HeartIcon from "../../uiComponents/HeartIcon";
import FullHeartIcon from "../../uiComponents/FullHeartIcon";
function CardAlbum({ album }) {
  //#region variables de estado
  const { clienteLogged, dispatchCliente } = useClienteLoggedContext();
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
  async function añadirFavorito(album) {
    let token = clienteLogged.tokensesion;
    let response = await clienteRESTService.añadirFavorito(token, album.id);
    if (response.ok) {
      let data = await response.json();
      dispatchCliente({
        type: "CLIENTE_RECUPERAR",
        payload: {
          datoscliente: data.datoscliente,
          tokensesion: data.tokensesion,
        },
      });
    }
  }
  async function eliminarFavorito(album) {
    let token = clienteLogged.tokensesion;
    let response = await clienteRESTService.eliminarFavorito(token, album.id);
    if (response.ok) {
      let data = await response.json();
      dispatchCliente({
        type: "CLIENTE_RECUPERAR",
        payload: {
          datoscliente: data.datoscliente,
          tokensesion: data.tokensesion,
        },
      });
    }
  }
  //#endregion

  //#region efectos

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
            {clienteLogged && (
              <div className="absolute top-0 left-0 p-2">
                {clienteLogged.datoscliente.favoritos.includes(album.id) ? (
                  <Button
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    size="small"
                    onPress={() => eliminarFavorito(album)}
                  >
                    <FullHeartIcon size={24} />
                  </Button>
                ) : (
                  <Button
                    isIconOnly
                    className="data-[hover]:bg-foreground/10"
                    radius="full"
                    variant="light"
                    size="small"
                    onPress={() => añadirFavorito(album)}
                  >
                    <HeartIcon size={24} />
                  </Button>
                )}
              </div>
            )}
          </div>
        </Link>
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
