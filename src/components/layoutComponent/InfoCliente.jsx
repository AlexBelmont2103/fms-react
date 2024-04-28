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
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import ModalRegistro from "./ModalRegistro";

function InfoCliente() {
  const { darkMode } = useDarkMode();
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="container bg-black flex mx-auto px-0 h-19 ">
      <div className="container flex gap-4 px-7 justify-start">
        <div className="py-2">
          <BotonDarkMode />
        </div>
      </div>
      <div
        className={
          darkMode
            ? "purple-light container bg-black flex justify-end gap-8"
            : "purple-dark container bg-black flex justify-end gap-8"
        }
      >
        {clienteLogged != null && (
          <div className="py-2 px-2">
            <User
              className="text-white"
              name={
                clienteLogged.datoscliente.nombre +
                " " +
                clienteLogged.datoscliente.apellidos
              }
              description={
                <Link href="/Cliente/Panel" size="sm">
                  {clienteLogged.datoscliente.cuenta.email}
                </Link>
              }
              avatarProps={{
                src: `${clienteLogged.datoscliente.cuenta.imagenAvatar}`,
              }}
            />
          </div>
        )}
        {clienteLogged == null && (
          <>
            <div className="py-2">
              <Popover placement="left" showArrow={true}>
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
      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
      >
        <ModalContent>
          <ModalRegistro onOpenChange={onOpenChange} />
        </ModalContent>
      </Modal>
    </div>
  );
}

export default InfoCliente;
