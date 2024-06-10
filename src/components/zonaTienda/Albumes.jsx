import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Pagination,
} from "@nextui-org/react";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import CardAlbum from "./CardAlbum";
import tiendaRESTService from "../../servicios/restTienda";

function Albumes() {
  //#region variables de estado
  const location = useLocation();
  const busqueda = new URLSearchParams(location.search);
  const [albumes, setAlbumes] = useState([]);
  const [albumesPorPagina, setAlbumesPorPagina] = useState(12);
  const [pagina, setPagina] = useState(1);
  const [albumesActuales, setAlbumesActuales] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(0);
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
  //#endregion
  //#region Funciones

  //#endregion
  //#region Efectos
  useEffect(() => {
    tiendaRESTService
      .RecuperarAlbumes(operacion, busquedaValor)
      .then((data) => {
        setAlbumes(data.datosalbumes);
      });
  }, [operacion, busquedaValor]);
  useEffect(() => {
    setTotalPaginas(Math.ceil(albumes.length / albumesPorPagina));
  }, [albumes, albumesPorPagina]);
  useEffect(() => {
    setAlbumesActuales(albumes.slice(0, albumesPorPagina));
  }, [albumes, albumesPorPagina]);
  //#endregion
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
        {albumesActuales.map((album) => (
          <div key={album._id}>
            <CardAlbum album={album} />
          </div>
        ))}
      </div>
      <div className="flex justify-center overflow-hidden w-full">
        <Pagination
          total={totalPaginas}
          current={pagina}
          initialPage={1}
          variant="faded"
          className="mt-2"
          showControls
          onChange={(page) => {
            setPagina(page);
            setAlbumesActuales(
              albumes.slice(
                (page - 1) * albumesPorPagina,
                page * albumesPorPagina
              )
            );
          }}
          
        />
      </div>
    </div>
  );
}

export default Albumes;
