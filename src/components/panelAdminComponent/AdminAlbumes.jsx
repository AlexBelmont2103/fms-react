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
  Image,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import ModalAlbum from "./ModalAlbum";
function AdminAlbumes({ albumes, setAlbumes, generos }) {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const [albumModal, setAlbumModal] = useState({});
  const [operacion, setOperacion] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //#endregion

  //#region funciones
  async function eliminarAlbum(idAlbum) {
    let response = await adminRESTService.eliminarAlbum({ idAlbum });
    if (response.codigo === 0) {
      setAlbumes(response.datosalbumes);
    }
  }
  //#endregion

  //#region efectos

  //#endregion
  return (
    <div className={darkMode ? "text-black" : "text-white"}>
      <Button
        className="my-2"
        color="primary"
        onPress={() => {
          setAlbumModal({
            nombre: "",
            artista: "",
            anhoLanzamiento: 0,
            genero: "",
            imagenPortada: "",
            numCanciones: 0,
            precio: 0,
            stock: 0,
          });
          setOperacion("Añadir");
          onOpen();
        }}
      >
        Crear Álbum
      </Button>
      <Table>
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Nombre</TableColumn>
          <TableColumn>Artista</TableColumn>
          <TableColumn>Stock</TableColumn>
          <TableColumn>Portada</TableColumn>
          <TableColumn>Acciones</TableColumn>
        </TableHeader>
        <TableBody>
          {albumes.map((album) => (
            <TableRow key={album._id}>
              <TableCell>{album._id}</TableCell>
              <TableCell>{album.nombre}</TableCell>
              <TableCell>{album.artista}</TableCell>
              <TableCell>{album.stock}</TableCell>
              <TableCell>
                <Image src={album.imagenPortada} width="100" height="100" />
              </TableCell>
              <TableCell>
                <Button
                  className="mr-1"
                  color="warning"
                  onPress={() => {
                    setAlbumModal(album);
                    setOperacion("Modificar");
                    onOpen();
                  }}
                >
                  Editar
                </Button>
                <Button
                  className="mr-1"
                  color="danger"
                  onPress={() => {
                    eliminarAlbum(album._id);
                  }}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        title="Nuevo Género"
        size="3xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        hideCloseButton={true}
      >
        <ModalContent
          className={
            darkMode ? "purple-light text-black" : "purple-dark text-white"
          }
        >
          <ModalAlbum
            albumModal={albumModal}
            generos={generos}
            operacion={operacion}
            setAlbumes={setAlbumes}
            onOpenChange={onOpenChange}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminAlbumes;
