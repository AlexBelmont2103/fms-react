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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import BannerDark from "../../assets/images/FullMetalStoreDark.png";
import BannerLight from "../../assets/images/FullMetalStoreLight.png";
import { Link, useLoaderData, useLocation } from "react-router-dom";
import { useItemsCarroContext } from "../../contextProviders/itemsCarroContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import CartIcon from "../../uiComponents/CartIcon";
import ModalCarrito from "./ModalCarrito";
import ElementoBusqueda from "./ElementoBusqueda";
import tiendaRESTService from "../../servicios/restTienda";
function BarraNavegacion() {
  //#region variables de estado
  const { itemsCarro } = useItemsCarroContext();
  const { darkMode } = useDarkMode();
  const respuestaserver = useLoaderData();
  const [isInvisible, setIsInvisible] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [albumesBusqueda, setAlbumesBusqueda] = useState([]);
  const generos = respuestaserver.datosgeneros;
  const [totalItemsCarro, setTotalItemsCarro] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const _location = useLocation();
  //#endregion

  //#region funciones
  const buscarAlbumes = async (busqueda) => {
    let response = await tiendaRESTService.buscarAlbumes(busqueda);
    console.log(response);
    setAlbumesBusqueda(response.datosalbumes);
  };
  //#endregion

  //#region efectos
  useEffect(() => {
    setTotalItemsCarro(
      itemsCarro.reduce((total, item) => total + item.cantidad, 0)
    );
    if (
      totalItemsCarro !== 0 &&
      _location.pathname === "/Pedido/MostrarPedido"
    ) {
      setIsInvisible(false);
    } else if (totalItemsCarro !== 0) {
      setIsInvisible(false);
      onOpen();
    } else {
      setIsInvisible(true);
    }
  }, [itemsCarro, totalItemsCarro]);
  useEffect(() => {
    console.log(albumesBusqueda);
    setAlbumesBusqueda([]);
    if (busqueda === "") {
      setAlbumesBusqueda([]);
    }
    buscarAlbumes(busqueda);
    console.log(albumesBusqueda);
  }, [busqueda]);
  //#endregion
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
            <div className={darkMode?"container flex flex-row gap-1 purple-light":"container flex flex-row gap-1 purple-dark"}>
              <Input
                type="text"
                placeholder="Buscar por grupo, nombre..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              <Popover 
              backdrop="blur"
              
              >
                <PopoverTrigger>
                  <Button color="primary" variant="shadow">
                    Buscar
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="grid grid-cols-1 gap-2">
                    {albumesBusqueda.map((album) => (
                      <ElementoBusqueda key={album._id} album={album} />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem className="px-5">
            <Dropdown>
              <DropdownTrigger>
                <Button color="primary" variant="shadow">
                  Categorías
                </Button>
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
            <button onClick={onOpen}>
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
          size="md"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          radius="md"
          scrollBehavior="inside"
          hideCloseButton={true}
        >
          <ModalContent>
            <ModalCarrito onOpenChange={onOpenChange} />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}

export default BarraNavegacion;
