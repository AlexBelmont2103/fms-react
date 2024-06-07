import { useState } from "react";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import adminRESTService from "../../servicios/restAdmin";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

function AdminGeneros({ generos, setGeneros }) {
  //#region variables de estado
    const { darkMode } = useDarkMode();
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion
  return (
    <div className={darkMode?"text-black":"text-white"}>
      <div>
        <Button color="primary">Crear Género</Button>
      </div>
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {generos.map((genero) => (
            <TableRow key={genero._id}>
              <TableCell>{genero._id}</TableCell>
              <TableCell>{genero.nombre}</TableCell>
              <TableCell>
                <Button color="warning">Editar</Button>
                <Button color="danger">Eliminar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default AdminGeneros;
