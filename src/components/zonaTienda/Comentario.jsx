import { useState, useEffect } from "react";
import { Card } from "@nextui-org/react";

function Comentario({ comentario }) {
  //#region variables de estado

  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion

  return (
    <Card shadow>
      <div className="flex flex-row justify-start items-center mx-4">
        <img
          src={comentario.imagen}
          alt="Imagen de Usuario"
          className="h-12 w-12 rounded-full"
        />
        <div className="flex flex-col justify-start items-start">
          <p className="text-lg font-bold px-2">{comentario.nombre}</p>
          <p className="text-lg px-2">{comentario.comentario}</p>
        </div>
      </div>
    </Card>
  );
}

export default Comentario;
