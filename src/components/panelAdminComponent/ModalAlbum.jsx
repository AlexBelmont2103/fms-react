import { useState, useEffect } from "react";
import {
  Button,
  Input,
  ModalHeader,
  ModalBody,
  Image,
  Select,
  SelectItem,
} from "@nextui-org/react";
import * as Yup from "yup";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import adminRESTService from "../../servicios/restAdmin";
function ModalAlbum({
  albumModal,
  setAlbumes,
  generos,
  operacion,
  onOpenChange,
}) {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const [album, setAlbum] = useState(albumModal);
  const [imagenPortada, setImagenPortada] = useState(album.imagenPortada);
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("* Nombre obligatorio")
      .max(200, "*Maximo 200 caracteres"),
    artista: Yup.string()
      .required("* Artista obligatorio")
      .max(200, "*Maximo 200 caracteres"),
    anhoLanzamiento: Yup.number()
      .required("* Año de lanzamiento obligatorio")
      .integer(),
    genero: Yup.string()
      .required("* Genero obligatorio")
      .max(50, "*Maximo 50 caracteres"),
    numCanciones: Yup.number()
      .required("* Número de canciones obligatorio")
      .integer(),
    precio: Yup.number().required("* Precio obligatorio").positive(),
    stock: Yup.number().required("* Stock obligatorio").integer(),
    imagenPortada: Yup.mixed().nullable(),
  });
  //#endregion

  //#region funciones
  function cargarImagenPortada(e) {
    setImagenPortada(URL.createObjectURL(e.target.files[0]));
  }
  async function validarAlbum() {
    try {
      const values = await validationSchema.validate(album);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
  async function agregarAlbum() {
    const formData = new FormData();
    for (let albumKey in album) {
      formData.append(albumKey, album[albumKey]);
    }
    let response = await adminRESTService.agregarAlbum(formData);
    if (response.codigo === 0) {
      setAlbumes(response.datosalbumes);
      onOpenChange();
    }
  }
  async function modificarAlbum() {
    const formData = new FormData();
    for (let albumKey in album) {
      formData.append(albumKey, album[albumKey]);
    }
    console.log("Valor del formData...", formData);
    let response = await adminRESTService.modificarAlbum(formData);
    if (response.codigo === 0) {
      setAlbumes(response.datosalbumes);
      onOpenChange();
    }
  }
  function onSubmit(ev) {
    ev.preventDefault();
    try{
        if(validarAlbum()){
            if(operacion === "Añadir"){
                agregarAlbum();
            }else if(operacion === "Modificar"){
                modificarAlbum();
            }
        }
    }catch(error){
        console.error(error);
    }
  }
  //#endregion

  //#region efectos

  //#endregion

  return (
    <div className="y-space-2">
      <ModalHeader>{operacion} Álbum</ModalHeader>
      <ModalBody>
        <form onSubmit={onSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="w-full">
              <Input
                label="Nombre"
                placeholder="Nombre del álbum"
                value={album.nombre}
                onChange={(e) => {
                  setAlbum({ ...album, nombre: e.target.value });
                }}
              />
            </div>
            <div className="w-full">
              <Input
                label="Artista"
                placeholder="Artista del álbum"
                value={album.artista}
                onChange={(e) => {
                  setAlbum({ ...album, artista: e.target.value });
                }}
              />
            </div>
            <div className="w-full">
              <Input
                label="Año de lanzamiento"
                placeholder="Año de lanzamiento del álbum"
                value={album.anhoLanzamiento}
                onChange={(e) => {
                  setAlbum({ ...album, anhoLanzamiento: e.target.value });
                }}
              />
            </div>
            <div className="w-full">
              <Select
                label="Género"
                placeholder={
                  album.genero ? album.genero : "Seleccione un género"
                }
                className="max-w-xs"
                items={generos}
                onChange={(e) => {
                  setAlbum({ ...album, genero: e.target.value });
                }}
              >
                {(generos) => (
                  <SelectItem key={generos.nombre} value={generos.nombre}>
                    {generos.nombre}
                  </SelectItem>
                )}
              </Select>
            </div>
            <div className="w-full">
              <Input
                label="Número de canciones"
                placeholder="Número de canciones del álbum"
                value={album.numCanciones}
                onChange={(e) => {
                  setAlbum({ ...album, numCanciones: e.target.value });
                }}
              />
            </div>
            <div className="w-full">
              <Input
                label="Precio"
                placeholder="Precio del álbum"
                value={album.precio}
                onChange={(e) => {
                  setAlbum({ ...album, precio: e.target.value });
                }}
              />
            </div>
            <div className="w-full">
              <Input
                label="Stock"
                placeholder="Stock del álbum"
                value={album.stock}
                onChange={(e) => {
                  setAlbum({ ...album, stock: e.target.value });
                }}
              />
            </div>
            <div className="w-full">
              <div className="hidden">
                <input
                  type="file"
                  id="imagenPortada"
                  accept="image/*"
                  onChange={(e) => {
                    setAlbum({
                      ...album,
                      imagenPortada: e.target.files[0],
                    });
                    cargarImagenPortada(e);
                  }}
                />
              </div>
              <div className="flex space-x-2">
                <label htmlFor="imagenPortada">
                  <Button
                    color="primary"
                    onPress={() => {
                      document.getElementById("imagenPortada").click();
                    }}
                  >
                    Seleccionar imagen de portada
                  </Button>
                </label>
                <Image
                  src={imagenPortada}
                  width="50"
                  height="50"
                  alt="Imagen de portada"
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <Button
              color="primary"
              type="submit"
              className="mr-2"
              onPress={() => {
                validationSchema.validate(album).then((values) => {
                  if (operacion === "Añadir") {
                    agregarAlbum();
                  } else if (operacion === "Modificar") {
                    modificarAlbum();
                  }
                });
              }}
            >
              Guardar
            </Button>
            <Button
              color="danger"
              className="mr-2"
              onPress={() => {
                onOpenChange();
              }}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </ModalBody>
    </div>
  );
}

export default ModalAlbum;
