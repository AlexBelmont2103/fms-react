import { useState, useEffect } from "react";
import { Button, Input, ModalHeader, ModalBody } from "@nextui-org/react";
import * as Yup from "yup";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import adminRESTService from "../../servicios/restAdmin";
function ModalGenero({ generoModal, setGeneros, operacion, onOpenChange }) {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const [genero, setGenero] = useState(generoModal);
  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required("El nombre es requerido")
      .max(50, "Máximo 50 caracteres"),
  });
  //#endregion

  //#region funciones
  function onSubmit(ev) {
    ev.preventDefault();
    validationSchema.validate(genero).then((values) => {
      if (operacion === "Añadir") {
        agregarGenero();
      } else if (operacion === "Modificar") {
        modificarGenero();
      }
    });
  }
  async function agregarGenero() {
    let response = await adminRESTService.agregarGenero(genero);
    if (response.codigo === 0) {
      setGeneros(response.datosgeneros);
      onOpenChange();
    }
  }
  async function modificarGenero() {
    console.log(genero);
    let response = await adminRESTService.modificarGenero(genero);
    if (response.codigo === 0) {
      setGeneros(response.datosgeneros);
      onOpenChange();
    }
  }

  //#endregion

  //#region efectos

  //#endregion

  return (
    <div className={darkMode ? "purple-light" : "purple-dark"}>
      <ModalHeader>{operacion} Género</ModalHeader>
      <ModalBody>
        <form onSubmit={onSubmit}>
          <div>
            <Input
              label="Nombre"
              placeholder="Nombre del género"
              value={genero.nombre}
              onChange={(e) => {
                setGenero({
                  ...genero,
                  nombre: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button color="success" className="mr-2" type="submit">
              Guardar
            </Button>
            <Button
              color="error"
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
export default ModalGenero;
