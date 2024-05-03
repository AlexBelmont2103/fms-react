import { useEffect, useState } from "react";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button,
  Image,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Badge,
  useDisclosure,
  Modal,
  ModalContent,
} from "@nextui-org/react";
import BannerDark from "../../assets/images/FullMetalStoreDark.png";
import BannerLight from "../../assets/images/FullMetalStoreLight.png";
import { Link, useLoaderData } from "react-router-dom";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import CartIcon from "../../uiComponents/CartIcon";
import ModalPedido from "./ModalPedido";
function BarraNavegacion() {
  const { itemsCarro } = useItemsCarroContext();
  const { darkMode } = useDarkMode();
  const respuestaserver = useLoaderData();
  const [isInvisible, setIsInvisible] = useState(false);
  const generos = respuestaserver.datosgeneros;
  const [totalItemsCarro, setTotalItemsCarro] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    setTotalItemsCarro(
      itemsCarro.reduce((total, item) => total + item.cantidad, 0)
    );
    if (totalItemsCarro === 0) {
      setIsInvisible(true);
    } else {
      setIsInvisible(false);
      onOpen();
    }
  }, [itemsCarro, totalItemsCarro]);
  return (
    <div className="container mx-auto px-0 h-auto rounded-md">
      <Navbar isBordered="true">
        <NavbarContent className="hidden sm:flex" justify="start">
          <NavbarItem>
            <Link color="foreground" href="/">
              <Image
                width={160}
                height={160}
                alt="Banner"
                src={darkMode ? BannerLight : BannerDark}
              />
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex" justify="start">
          <NavbarItem>
            <div className="container flex gap-1">
              <Input type="text" placeholder="Buscar por grupo, titulo..." />
              <Button color="primary" variant="shadow">
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
          <NavbarItem className="px-5">
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary">Categorías</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Dynamic Actions" items={generos}>
                {(genero) => (
                  <DropdownItem key={genero._id} textValue={genero.nombre}>
                    <Link to={`Tienda/Albumes?genero=${genero.nombre}`}>
                      {genero.nombre}
                    </Link>
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem className="px-5">
            <button  onClick={onOpen}>
              <Badge
                color="danger"
                content={totalItemsCarro}
                isInvisible={isInvisible}
                showOutline={false}
                shape="circle"
              >
                <CartIcon size={30} />
              </Badge>
            </button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      {/*Modal de pedido */}
      <div className="px-5">
        <Modal
          size="3xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          radius="md"
          scrollBehavior="inside"
        >
          <ModalContent>
            <ModalPedido onOpenChange={onOpenChange} />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default BarraNavegacion;
