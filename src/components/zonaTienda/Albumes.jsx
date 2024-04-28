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
import { useDarkMode } from "../../contextProviders/darkModeContext";
import tiendaRESTService from "../../servicios/restTienda";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";

function Albumes() {
  const location = useLocation();
  const busqueda = new URLSearchParams(location.search);
  const { darkMode } = useDarkMode();
  let operacion = "";
  let busquedaValor = "";
  if (busqueda.has("artista")) {
    operacion = "artista";
    busquedaValor = busqueda.get("artista");
  } else if (busqueda.has("genero")) {
    operacion = "genero";
    busquedaValor = busqueda.get("genero");
  }
  const [albumes, setAlbumes] = useState([]);
  const itemsCarroContext = useItemsCarroContext();
  function añadirAlbumCarro(album) {
    if (itemsCarroContext.itemsCarro.some((item) => item._id === album._id)) {
      itemsCarroContext.dispatch({
        type: "ADD_CANTIDAD_ALBUM",
        payload: { _id: album._id, cantidad: 1 },
      });
    } else {
      itemsCarroContext.dispatch({
        type: "ADD_NUEVO_ALBUM",
        payload: { album, cantidad: 1 },
      });
    }
  }
  useEffect(() => {
    tiendaRESTService
      .RecuperarAlbumes(operacion, busquedaValor)
      .then((data) => {
        setAlbumes(data.datosalbumes);
      });
  }, [operacion, busquedaValor]);
  useEffect(() => {
    console.log(itemsCarroContext.itemsCarro);
  }, [itemsCarroContext.itemsCarro]);

  return (
    <div className={darkMode ? "purple-light" : "purple-dark"}>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albumes.map((album) => (
          <div key={album._id}>
            <Card className="py-4">
              <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{album.nombre}</p>
                <small className="text-default-500">
                  {album.numCanciones} Temas
                </small>
                <Link to={`?artista=${album.artista}`}>
                  <h4
                    className="font-bold text-large"
                    textvalue={album.artista}
                  >
                    {album.artista}
                  </h4>
                </Link>
              </CardHeader>
              <CardBody className="overflow-visible py-2">
                <Image
                  alt="Card background"
                  className="object-cover rounded-xl"
                  src={album.imagenPortada}
                  width={270}
                />
              </CardBody>
              <CardFooter className="overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                {album.stock > 0 ? (
                  <Button
                    className="text-tiny"
                    variant="shadow"
                    color="primary"
                    radius="lg"
                    size="sm"
                    onClick={() => añadirAlbumCarro(album)}
                  >
                    Comprar
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="text-tiny"
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
        ))}
      </div>
    </div>
  );
}

export default Albumes;
