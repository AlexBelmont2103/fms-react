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
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import ModalGenero from "./ModalGenero";

function AdminGeneros({ generos, setGeneros }) {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const [generoModal, setGeneroModal] = useState({});
  const [operacion, setOperacion] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //#endregion

  //#region funciones
  async function eliminarGenero(idGenero){
    let response = await adminRESTService.eliminarGenero({idGenero});
    if(response.codigo === 0){
      setGeneros(response.datosgeneros);
    }
  }
  //#endregion

  //#region efectos

  //#endregion
  return (
    <div className={darkMode ? "text-black" : "text-white"}>
      <div>
        <Button
          className="my-2"
          color="primary"
          onPress={() => {
            setGeneroModal({
              nombre: "",
            });
            setOperacion("Añadir");
            onOpen();
          }}
        >
          Crear Género
        </Button>
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
                <Button
                  className="mr-1"
                  color="warning"
                  onPress={() => {
                    setGeneroModal(genero);
                    setOperacion("Modificar");
                    onOpen();
                  }}
                >
                  Editar
                </Button>
                <Button className="mr-1" color="danger"  onClick={()=>{eliminarGenero(genero._id)}}>
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal
        title="Nuevo Género"
        size="xl"
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
          <ModalGenero
            generoModal={generoModal}
            setGeneros={setGeneros}
            operacion={operacion}
            onOpenChange={onOpenChange}
          />
        </ModalContent>
      </Modal>
    </div>
  );
}

export default AdminGeneros;
