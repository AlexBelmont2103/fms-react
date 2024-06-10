import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardHeader, Image } from "@nextui-org/react";
import { useDarkMode } from "../../contextProviders/darkModeContext";

function ElementoBusqueda({ album }) {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion

  return (
    <>
      <div
        className={
          darkMode ? "px-5 py-2 purple-light" : "px-5 py-2 purple-dark"
        }
      >
        <Link to={"/Tienda/Album/" + album._id}>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt={album.nombre}
              height={40}
              radius="md"
              src={album.imagenPortada}
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-xs">{album.nombre}</p>
            </div>
          </CardHeader>
        </Card>
        </Link>
      </div>
    </>
  );
}

export default ElementoBusqueda;
