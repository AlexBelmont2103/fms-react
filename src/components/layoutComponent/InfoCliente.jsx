import { useState, useEffect } from "react";
import BotonDarkMode from "./BotonDarkMode";
import Login from "./Login";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  User,
  Button,
  useDisclosure,
  Modal,
  ModalContent,
  Chip,
  image,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import ModalRegistro from "./ModalRegistro";
import Juego from "./Juego";

function InfoCliente() {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  const [imagenAvatar, setImagenAvatar] = useState(null); //clienteLogged.datoscliente.cuenta.imagenAvatar
  const [isAdmin, setIsAdmin] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //#endregion
  //#region funciones

  //#endregion

  //#region efectos
  useEffect(() => {
    if (clienteLogged != null) {
      if (
        clienteLogged.datoscliente.cuenta.email === "admin@fullmetalstore.es"
      ) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, [clienteLogged]);
  //Efecto para actualizar la imagen de avatar
  useEffect(() => {
    console.log("Cambió el clienteLogged");
    if (clienteLogged != null) {
      const urlImagen = clienteLogged.datoscliente.cuenta.imagenAvatar;
      localStorage.removeItem("imagenAvatar");
      localStorage.setItem("imagenAvatar", urlImagen);
      setImagenAvatar(urlImagen);
    }
  }, [clienteLogged]);

  useEffect(() => {
    const urlImagen = localStorage.getItem("imagenAvatar");
    if (urlImagen) {
      setImagenAvatar(urlImagen);
    }
  }, []);
  //#endregion
  return (
    <div className="container bg-black flex mx-auto px-0 h-19 ">
      <div className="container flex gap-4 px-7 justify-start">
        <div className="py-4 px-5">
          <BotonDarkMode />
        </div>
      </div>
      <div className="container flex gap-4 px-7 py-3 justify-center">
        <Juego />
      </div>
      <div
        className={
          darkMode
            ? "purple-light container bg-black flex justify-end gap-8"
            : "purple-dark container bg-black flex justify-end gap-8"
        }
      >
        {clienteLogged != null && (
          <div className="flex">
            <div className="py-2 px-2">
              <User
                className="text-white"
                name={
                  clienteLogged.datoscliente.nombre +
                  " " +
                  clienteLogged.datoscliente.apellidos
                }
                description={
                  <Link to="/Cliente/Panel/InicioPanel" size="sm">
                    {clienteLogged.datoscliente.cuenta.email}
                  </Link>
                }
                avatarProps={{
                  src: imagenAvatar,
                }}
              />
            </div>
            <div className="py-4 px-2">
              <Chip
                as={Button}
                color="danger"
                onPress={() => {
                  dispatch({ type: "CLIENTE_LOGOUT" });
                  localStorage.removeItem("idCliente");
                }}
              >
                Logout
              </Chip>
            </div>
            {isAdmin && (
              <div
                className={darkMode ? "purple-light py-4" : "purple-dark py-4"}
              >
                <Chip
                  as={Link}
                  color="success"
                  to="/Admin/PanelAdmin"
                  variant="shadow"
                >
                  Admin
                </Chip>
              </div>
            )}
          </div>
        )}
        {clienteLogged == null && (
          <>
            <div className="py-2">
              <Popover
                placement="left"
                showArrow={true}
                className={
                  darkMode
                    ? "purple-light bg-white text-black container flex "
                    : "purple-dark bg-gray-800 text-white container flex "
                }
              >
                <PopoverTrigger>
                  <Button color="primary" variant="shadow">
                    Login
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Login />
                </PopoverContent>
              </Popover>
            </div>
            <div className="py-2 px-2">
              <Button
                as={Link}
                color="primary"
                href="#"
                variant="ghost"
                onPress={onOpen}
              >
                Registrate
              </Button>
            </div>
          </>
        )}
      </div>
      {/*Modal de Registro */}
      <div className="px-5">
        <Modal
          size="2xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
          hideCloseButton={true}
        >
          <ModalContent>
            <ModalRegistro onOpenChange={onOpenChange} />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default InfoCliente;
