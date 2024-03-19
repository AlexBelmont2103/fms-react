import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
  Input,
  Divider,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  useDisclosure,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import Banner from "../../assets/images/FullMetalStore.png";
import ModalRegistro from "./ModalRegistro";

function Header() {
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  const { itemsCarro } = useItemsCarroContext();
  const items = [
    {
      key: "new",
      label: "New file",
    },
    {
      key: "copy",
      label: "Copy link",
    },
    {
      key: "edit",
      label: "Edit file",
    },
    {
      key: "delete",
      label: "Delete file",
    },
  ];
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  function calcularTotalCarro() {
    let _total = 0;
    itemsCarro.map((item) => {
      let _subtotal = item.libroElemento.Precio * item.cantidadElemento;
      _total += _subtotal;
    });
    return _total.toFixed(2);
  }

  return (
    <header>
      <div className="container flex mx-auto px-0 h-19 ">
        <div className="container bg-black flex justify-end gap-8">
          <div className="py-2">
            <Button href="#" color="default" variant="shadow">
              Login
            </Button>
          </div>
          <div className="py-2 px-2">
            <Button
              as={Link}
              color="secondary"
              href="#"
              variant="ghost"
              onPress={onOpen}
            >
              Registrate
            </Button>
          </div>
        </div>
      </div>
      <Divider className="py-1" />
      <div className="container mx-auto px-0 h-auto">
        <Navbar>
          <NavbarContent className="hidden sm:flex" justify="start">
            <NavbarItem>
              <Link color="foreground" href="/">
                <Image width={160} height={160} alt="Banner" src={Banner} />
              </Link>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent className="hidden sm:flex" justify="start">
            <NavbarItem>
              <div className="container flex gap-1">
                <Input type="text" placeholder="Buscar por grupo, titulo..." />
                <Button color="secondary" variant="ghost">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </Button>
              </div>
            </NavbarItem>
          </NavbarContent>
          <NavbarContent className="hidden sm:flex" justify="end">
            <NavbarItem>
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="bordered">Categorías</Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Dynamic Actions" items={items}>
                  {(item) => (
                    <DropdownItem
                      key={item.key}
                      color={item.key === "delete" ? "danger" : "default"}
                      className={item.key === "delete" ? "text-danger" : ""}
                    >
                      {item.label}
                    </DropdownItem>
                  )}
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
            <NavbarItem>
              <Link color="foreground" href="/Tienda/MostrarPedido">
                Aquí va el carrito
              </Link>
            </NavbarItem>
          </NavbarContent>
        </Navbar>
      </div>
      {/*Modal de Registro */}
      <Modal size="2xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          <ModalRegistro onOpenChange={onOpenChange}/>
        </ModalContent>
      </Modal>
    </header>
  );
}

export default Header;
