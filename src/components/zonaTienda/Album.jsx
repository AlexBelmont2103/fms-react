import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Textarea, Button } from "@nextui-org/react";
import tiendaRESTService from "../../servicios/restTienda";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import Reproductor from "./Reproductor";
import Comentario from "./Comentario";
import Asuka from "../../assets/images/asuka.jpeg";
import Shinji from "../../assets/images/shinji-pensive.png";
import Gendo from "../../assets/images/Gendo.jpg";
import Ristuko from "../../assets/images/ritsuko.jpeg";
function Album() {
  //#region variables de estado
  const { clienteLogged } = useClienteLoggedContext();
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
  const [comentario, setComentario] = useState("");
  const [comentarios, setComentarios] = useState([
    {
      id: 1,
      nombre: "Asuka Langley",
      comentario: "Está bien, pero no es tan bueno como el anterior",
      imagen: Asuka,
    },
    {
      id: 2,
      nombre: "Gendo Ikari",
      comentario: "Escuché este álbum mientras pensaba en devolver la vida a mi esposa",
      imagen: Gendo,
    },
    {
      id: 3,
      nombre: "Shinji Ikari",
      comentario: "Creo que esta música me hace sentir menos solo",
      imagen: Shinji,
    },
    {
      id: 4,
      nombre: "Ristuko Akagi",
      comentario: "Me encanta este álbum, es muy relajante",
      imagen: Ristuko,
    },
  ]);
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
                <p>{album.descripcion}</p>
              </div>
            </div>
            <div className="py-4">
              <h3 className="text-2xl font-semibold my-4">Comentarios</h3>
              {clienteLogged ? (
                <Card className="py-4">
                  <div className="flex flex-row justify-start items-center mx-4">
                    <div>
                      <img
                        src={clienteLogged.datoscliente.cuenta.imagenAvatar}
                        alt="Imagen de Usuario"
                        className="h-12 w-12 rounded-full"
                      />
                    </div>
                    <div className="w-full px-2">
                      <div className="flex flex-col justify-start items-start w-full">
                        <p className="text-lg font-bold">
                          {clienteLogged.datoscliente.cuenta.nombre}
                        </p>
                        <p className="text-lg w-full">
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows={5}
                            placeholder="Escribe un comentario"
                          ></textarea>
                        </p>
                        <div className="flex flex-row justify-end items-center w-full">
                          <Button
                            auto
                            type="submit"
                            color="primary"
                            className="w-1/8 mx-2"
                            onClick={() => {
                              console.log("Comentario enviado");
                            }}
                          >
                            Enviar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ) : (
                <div>
                  <p>
                    <a href="/login">Inicia sesión</a> para dejar un comentario
                  </p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 py-4">
                {comentarios.map((comentario) => (
                  <Comentario comentario={comentario} key={comentario.id} />
                ))}
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
