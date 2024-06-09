import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import tiendaRESTService from "../../servicios/restTienda";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import Reproductor from "./Reproductor";
function Album() {
  //#region variables de estado
  const { itemsCarro, dispatch } = useItemsCarroContext();
  const { darkMode } = useDarkMode();
  const [album, setAlbum] = useState({
    nombre: "",
    artista: "",
    genero: "",
    precio: 0,
    stock: 0,
  });
  const [datosSpotify, setDatosSpotify] = useState(null);
  const [tokenSpotify, setTokenSpotify] = useState("");
  const [imagenesSpotify, setImagenesSpotify] = useState([]);
  const [pistasSpotify, setPistasSpotify] = useState([]);
  const location = useLocation();
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos
  useEffect(() => {
    let id = location.pathname.split("/")[3];
    console.log("id: ", id);
    const fetchAlbum = async () => {
      let data = await tiendaRESTService.RecuperarAlbum(id);
      console.log("data: ", data);
      setAlbum(data.datosalbum);
      setDatosSpotify(data.datosSpotify);
      setTokenSpotify(data.tokenSpotify);
      setImagenesSpotify(data.datosSpotify.images);
      setPistasSpotify(data.pistasSpotify);
    };
    fetchAlbum();
  }, [location]);

  //#endregion

  return (
    <div
      className={
        darkMode
          ? "purple-light text-black my-2"
          : "purple-dark text-white my-2"
      }
    >
      {datosSpotify ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            {/*Segundo grid */}
            <div className="grid grid-cols-2 gap-2">
              <div className="col-span-1">
                <h2 className="text-2xl font-bold mb-4">
                  Información del Álbum
                </h2>
                <p>
                  <strong>Nombre del álbum:</strong> {datosSpotify.name}
                </p>
                <p>
                  <strong>Fecha de lanzamiento:</strong>{" "}
                  {datosSpotify.release_date}
                </p>
                <p>
                  <strong>Total de pistas:</strong> {datosSpotify.total_tracks}
                </p>
                <p>
                  <strong>Enlace a Spotify:</strong>{" "}
                  <a
                    href={datosSpotify.external_urls.spotify}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Escucha en Spotify
                  </a>
                </p>
              </div>
              <div className="col-span-1">
                <h2 className="text-2xl font-bold mb-4">Descripción</h2>
                <p>
                  {album.descripcion}
                </p>
              </div>
            </div>

            <div>
              {/*Vamos a añadir comentarios de prueba, para rellenar la página */}
              <h3 className="text-2xl font-semibold">Comentarios</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-background/60 dark:bg-default-100/50 p-2 rounded-md">
                  <p className="text-foreground/80">Comentario de prueba 1</p>
                </div>
                <div className="bg-background/60 dark:bg-default-100/50 p-2 rounded-md">
                  <p className="text-foreground/80">Comentario de prueba 2</p>
                </div>
                <div className="bg-background/60 dark:bg-default-100/50 p-2 rounded-md">
                  <p className="text-foreground/80">Comentario de prueba 3</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-grow">
              <Reproductor
                datosSpotify={datosSpotify}
                tokenSpotify={tokenSpotify}
                pistasSpotify={pistasSpotify}
                album={album}
              />
            </div>
            <div className="flex-grow my-2"></div>
          </div>
        </div>
      ) : (
        <div>Cargando...</div>
      )}
    </div>
  );
}

export default Album;
