import { useState, useEffect, useRef } from "react";
import { Card, CardFooter, Image, Button, Divider } from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import clienteRESTService from "../../servicios/restCliente";
import FormDatosCliente from "./FormDatosCliente";
function DatosCliente({ cliente }) {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const [imagenAvatar, setImagenAvatar] = useState(cliente.cuenta.imagenAvatar);
  const [archivo, setArchivo] = useState(null);
  const fileInputRef = useRef(null);
  const [isSubirImagenDisabled, setIsSubirImagenDisabled] = useState(true);
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  //#endregion

  //#region funciones
  function handleImageClick() {
    fileInputRef.current.click();
  }
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagenAvatar(e.target.result);
        setArchivo(file);
      };
      reader.readAsDataURL(file);
    }
  }
  async function subirImagen() {
    const formData = new FormData();
    if (archivo) {
      formData.append("idCliente", cliente._id);
      formData.append("imagenAvatar", archivo);
    }
    let response = await clienteRESTService.cambiarImagenAvatar(
      formData,
      clienteLogged.tokensesion
    );
    if (response.codigo === 0) {
      let payload = {
        datoscliente: {
          ...response.datoscliente,
          imagenAvatar:
            response.datoscliente.imagenAvatar + "?t=" + new Date().getTime(),
        },
        tokensesion: response.tokensesion,
      };

      dispatch({ type: "CLIENTE_LOGIN", payload: payload });
      console.log(clienteLogged);
    }
  }
  //#endregion

  //#region efectos
  //Efecto para habilitar el botón de subir imagen
  useEffect(() => {
    setIsSubirImagenDisabled(!archivo);
  }, [archivo]);
  //#endregion

  return (
    <div
      className={
        darkMode
          ? "container flex justify-around text-black"
          : "container flex justify-around text-white"
      }
    >
      <div className="w-full flex flex-row justify-center">
        <div className="">
          <div className="py-4 px-4">
            <h2>Mi foto de perfil</h2>
          </div>

          <div className="w-60 h-80 ">
            <Card
              isFooterBlurred
              radius="lg"
              className="border-none  w-full h-full"
              fullWidth={true}
            >
              <div className="w-full h-full">
                <Image
                  alt="Imagen avatar"
                  className="object-cover"
                  height={200}
                  width={300}
                  src={imagenAvatar}
                  onClick={handleImageClick}
                />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              <CardFooter className="overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <Button
                  className="text-tiny w-full"
                  variant="shadow"
                  color="primary"
                  radius="lg"
                  size="sm"
                  disabled={isSubirImagenDisabled}
                  onClick={subirImagen}
                >
                  Cambiar foto de perfil
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      <div className="w-30 px-2">
        <Divider orientation="vertical" />
      </div>
      <div className="w-full px-4">
        <h2 className="py-2">Mis datos personales</h2>
        <FormDatosCliente cliente={cliente} />
      </div>
    </div>
  );
}

export default DatosCliente;
