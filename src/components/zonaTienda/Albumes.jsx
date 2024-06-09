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
import CardAlbum from "./CardAlbum";
import tiendaRESTService from "../../servicios/restTienda";

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

  useEffect(() => {
    tiendaRESTService
      .RecuperarAlbumes(operacion, busquedaValor)
      .then((data) => {
        setAlbumes(data.datosalbumes);
      });
  }, [operacion, busquedaValor]);
  
  return (
    <div className={darkMode ? "purple-light" : "purple-dark"}>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albumes.length === 0 && (
          <div className="w-full h-full">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">No hay albumes</h3>
              </CardHeader>
              <CardBody>
                <p className="text-sm text-foreground/80">
                  No se han encontrado albumes con los criterios de búsqueda
                </p>
              </CardBody>
              <CardFooter>
                <Link to="/" className="text-sm text-primary">
                  Volver a la tienda
                </Link>
              </CardFooter>
            </Card>
          </div>
        )}
        {albumes.map((album) => (
          <div  key={album._id}>
            <CardAlbum album={album} />
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default Albumes;
