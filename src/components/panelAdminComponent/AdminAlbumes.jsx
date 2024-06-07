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
  Image
} from "@nextui-org/react";
function AdminAlbumes({ albumes }) {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion
  console.log(albumes);
  return (
    <div className={darkMode?"text-black":"text-white"}>
      <Button color="primary">Crear Álbum</Button>
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Artista</TableColumn>
          <TableColumn>Portada</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {albumes.map((album) => (
            <TableRow key={album._id}>
              <TableCell>{album._id}</TableCell>
              <TableCell>{album.nombre}</TableCell>
              <TableCell>{album.artista}</TableCell>
              <TableCell>
                <Image src={album.imagenPortada} width="100" height="100" />
              </TableCell>
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

export default AdminAlbumes;
