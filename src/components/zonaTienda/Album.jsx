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
  const location = useLocation();
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
    };
    fetchAlbum();
  }, [location]);

  //#endregion

  return (
    <div
      className={
        darkMode ? "purple-light text-black my-2" : "purple-dark text-white my-2"
      }
    >
      <div className="grid grid-cols-3 gap-4">
        <div>
            <Reproductor datosSpotify={datosSpotify} tokenSpotify={tokenSpotify}/>
        </div>
        <div>
          <h1>Nombre del álbum: {album.nombre}</h1>
          <h2>Nombre del artista: {album.artista}</h2>
          <h3>Género: {album.genero}</h3>
          <h4>Precio: {album.precio}</h4>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}

export default Album;
