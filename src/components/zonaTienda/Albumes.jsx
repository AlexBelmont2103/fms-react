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

function Albumes() {
  const location = useLocation();
  const busqueda = new URLSearchParams(location.search);
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
  useEffect(() => {
    tiendaRESTService
      .RecuperarAlbumes(operacion, busquedaValor)
      .then((data) => {
        setAlbumes(data.datosalbumes);
      });
  }, [operacion, busquedaValor]);
  return (
    <div>
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
                  <h4 className="font-bold text-large">{album.artista}</h4>
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
              <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny">Available soon.</p>
                <Button
                  className="text-tiny text-white bg-black/20"
                  variant="flat"
                  color="primary"
                  radius="lg"
                  size="sm"
                >
                  Notify me
                </Button>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Albumes;
