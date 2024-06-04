import { Card, CardHeader, Image } from "@nextui-org/react";
import { useState,useEffect } from "react";
import { useDarkMode } from "../../contextProviders/darkModeContext";
function ElementoPedidoCompletado({ elemento }) {
    //#region variables de estado
    const [elementoState, setElementoState] = useState(elemento);
    const { darkMode } = useDarkMode();
    //#endregion

    //#region funciones
    function subtotalAlbum() {
        return (elementoState.cantidad * elementoState.album.precio).toFixed(2);
    }
    //#endregion

    //#region efectos

    //#endregion
    console.log("elemento", elemento);
  return (
    <div className={darkMode?"px-5 py-2 purple-light":"px-5 py-2 purple-dark"}>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt={elementoState.album.nombre}
            height={40}
            radius="md"
            src={elementoState.album.imagenPortada}
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-xs">
              {elementoState.album.nombre} X {elementoState.cantidad}
            </p>
            <p className="text-small text-red-500">{subtotalAlbum()} €</p>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

export default ElementoPedidoCompletado;
