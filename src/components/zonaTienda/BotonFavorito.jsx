import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import clienteRESTService from "../../servicios/restCliente";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import HeartIcon from "../../uiComponents/HeartIcon";
import FullHeartIcon from "../../uiComponents/FullHeartIcon";

function BotonFavorito({ album }) {
  //#region variables de estado
  const [esFavorito, setEsFavorito] = useState(false);
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  //#endregion

  //#region funciones
  async function agregarFavorito(album) {
    let response = await clienteRESTService.agregarFavorito(
      album._id,
      clienteLogged.tokensesion
    );
    console.log("Response", response);
    if (response.codigo === 0) {
      dispatch({
        type: "CLIENTE_LOGIN",
        payload: {
          datoscliente: response.datoscliente,
          tokensesion: response.tokensesion,
        },
      });
      setEsFavorito(true);
    }
  }
  async function eliminarFavorito(album) {
    let response = await clienteRESTService.eliminarFavorito(
      album._id,
      clienteLogged.tokensesion
    );
    if (response.codigo === 0) {
      dispatch({
        type: "CLIENTE_LOGIN",
        payload: {
          datoscliente: response.datoscliente,
          tokensesion: response.tokensesion,
        },
      });
      setEsFavorito(false);
    }
  }
  //#endregion

  //#region efectos
  useEffect(() => {
    let esFavorito = false;
    if (clienteLogged) {
      clienteLogged.datoscliente.favoritos.map((favorito) => {
        if (favorito._id === album._id) {
          console.log("Es favorito", album.nombre);
          esFavorito = true;
        }
      });
    }
    setEsFavorito(esFavorito);
  }, [clienteLogged, album]);
  //#endregion

  return (
    <>
      {clienteLogged && (
        <div>
          {esFavorito ? (
            <Button
              className="w-full text-large"
              variant="shadow"
              color="danger"
              radius="lg"
              size="sm"
              onPress={() => eliminarFavorito(album)}
            >
              <FullHeartIcon size={24} />
            </Button>
          ) : (
            <Button
              className="w-full text-large"
              variant="shadow"
              color="success"
              radius="lg"
              size="sm"
              onPress={() => agregarFavorito(album)}
            >
              <HeartIcon size={24} />
            </Button>
          )}
        </div>
      )}
    </>
  );
}

export default BotonFavorito;
