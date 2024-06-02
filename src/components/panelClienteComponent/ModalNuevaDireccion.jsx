import { useState, useEffect } from "react";
import {
  Divider,
  Button,
  Input,
  Select,
  ModalHeader,
  ModalBody,
  SelectItem,
} from "@nextui-org/react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import pedidoRESTService from "../../servicios/restPedido";
import clienteRESTService from "../../servicios/restCliente";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useDarkMode } from "../../contextProviders/darkModeContext";

function ModalNuevaDireccion({ direccion, operacion, onOpenChange }) {
  //#region variables de estado
  const [direccionForm, setDireccionForm] = useState(direccion);
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  const { darkMode } = useDarkMode();
  const [provincias, setProvincias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  //#endregion

  //#region funciones
  const validationSchema = Yup.object({
    calle: Yup.string().required("La calle es requerida"),
    numero: Yup.string().required("El número es requerido"),
    municipio: Yup.object()
      .shape({
        CMUM: Yup.string().required("Campo requerido: CMUM"),
        CPRO: Yup.string().required("Campo requerido: CPRO"),
        CUN: Yup.string().required("Campo requerido: CUN"),
        DMUN50: Yup.string().required("Campo requerido: DMUN50"),
      })
      .required("Campo requerido: Municipio"),
    provincia: Yup.object()
      .shape({
        CPRO: Yup.string().required("Campo requerido: CPRO"),
        PRO: Yup.string().required("Campo requerido: PRO"),
      })
      .required("Campo requerido: Provincia"),
    cp: Yup.string().required("El código postal es requerido"),
  });
  function onSubmit(ev) {
    ev.preventDefault();
    validationSchema.validate(direccionForm).then((values) => {
      console.log("submit", direccionForm);
    });
    if (operacion === "Añadir") {
      guardarDireccion();
    }else if(operacion === "Modificar"){
      modificarDireccion();
    }
  }
  async function guardarDireccion() {}
  async function modificarDireccion() {}
  //#endregion

  //#region efectos
  //Efecto para cargar las provincias
  useEffect(() => {
    async function cargarProvincias() {
      let response = await pedidoRESTService.recuperarProvincias();

      setProvincias(response.provincias);
    }
    cargarProvincias();
  }, []);
  //Efecto para cargar los municipios
  useEffect(() => {
    setDireccionForm({ ...direccionForm, municipio: {} });
    setMunicipios([]);
    setTimeout(() => {
      async function cargarMunicipios() {
        if (direccionForm.provincia && direccionForm.provincia.CPRO) {
          let response = await pedidoRESTService.recuperarMunicipios(
            direccionForm.provincia.CPRO
          );
          console.log(response);
          setMunicipios(response.municipios);
        }
      }
      cargarMunicipios();
    }, 2000);
  }, [direccionForm.provincia]);
  //#endregion
  console.log(direccion);
  console.log(direccionForm);
  return (
    <div
      className={
        darkMode
          ? "purple-light bg-blue-200 tex-black"
          : "purple-dark bg-gray-800 text-white"
      }
    >
      <ModalHeader>{operacion} dirección</ModalHeader>
      <ModalBody>
        <form onSubmit={onSubmit} className="x-space-4 y-space-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Calle"
                placeholder="Calle Falsa 123"
                width="100%"
                color="primary"
                variant="underlined"
                value={direccionForm.calle}
                onChange={(e) => {
                  setDireccionForm({ ...direccionForm, calle: e.target.value });
                }}
              />
            </div>
            <div>
              <Input
                label="País"
                placeholder="España"
                width="100%"
                color="primary"
                variant="underlined"
                value={direccionForm.pais}
                onChange={(e) => {
                  setDireccionForm({ ...direccionForm, pais: e.target.value });
                }}
              />
            </div>
            <div>
              <Input
                label="Código postal"
                placeholder="12345"
                width="100%"
                color="primary"
                variant="underlined"
                value={direccionForm.cp}
                onChange={(e) => {
                  setDireccionForm({ ...direccionForm, cp: e.target.value });
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Select
                label="Provincia"
                placeholder="Provincia"
                width="100%"
                color="primary"
                variant="underlined"
                value={direccionForm.provincia.CPRO}
                onChange={(e) => {
                  console.log(e.target.value);
                  const selectedProvincia = provincias.find(
                    (provincia) => provincia.CPRO === e.target.value
                  );
                  console.log(selectedProvincia);

                  setDireccionForm({
                    ...direccionForm,
                    provincia: selectedProvincia,
                  });
                }}
              >
                {provincias.map((provincia) => (
                  <SelectItem
                    key={provincia.CPRO}
                    value={provincia}
                    label={provincia.PRO}
                  >
                    {provincia.PRO}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <div>
              <Select
                label="Municipio"
                placeholder="Municipio"
                width="100%"
                color="primary"
                variant="underlined"
                value={direccionForm.municipio.CMUM}
                onChange={(e) => {
                  console.log(e.target.value);
                  const selectedMunicipio = municipios.find(
                    (municipio) => municipio.CMUM === e.target.value
                  );
                  console.log(selectedMunicipio);
                  setDireccionForm({
                    ...direccionForm,
                    municipio: selectedMunicipio,
                  });
                }}
              >
                {municipios.length === 0 ? (
                  <SelectItem value="" label="Selecciona una provincia">
                    Selecciona una provincia primero...
                  </SelectItem>
                ) : (
                  municipios.map((municipio) => (
                    <SelectItem
                      key={municipio.CMUM}
                      value={municipio}
                      label={municipio.DMUN50}
                    >
                      {municipio.DMUN50}
                    </SelectItem>
                  ))
                )}
              </Select>
            </div>
          </div>
          <div className="py-4">
            <Button color="primary" type="submit" block>
              {operacion} dirección
            </Button>
          </div>
        </form>
      </ModalBody>
    </div>
  );
}

export default ModalNuevaDireccion;
