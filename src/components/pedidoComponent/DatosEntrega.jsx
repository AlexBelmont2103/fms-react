import { useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useFormikContext, Field, ErrorMessage } from "formik";
import pedidoRESTService from "../../servicios/restPedido";
import { useLoaderData } from "react-router-dom";

function DatosEntrega({values}) {
  //#region Variables de estado
  const { clienteLogged } = useClienteLoggedContext();
  const provincias = useLoaderData();
  const { setFieldValue } = useFormikContext();
  const [municipios, setMunicipios] = useState({});
  const direccionPrincipal = clienteLogged.datoscliente.direcciones.find(
    (dir) => dir.esPrincipal
  );
  let tipoDireccion = "dirprincipal";
  let tipoContacto = "clienteLogged";
  const [esPrincipal, setEsPrincipal] = useState(true);
  const [contactoCliente, setContactoCliente] = useState(true);
  //#endregion
  //#region Funciones
  function cambiarDireccion(ev) {
    tipoDireccion = ev.target.value;
    if (tipoDireccion === "dirprincipal") {
      values.calle = direccionPrincipal.calle;
      values.municipio = direccionPrincipal.municipio;
      values.provincia = direccionPrincipal.provincia;
      values.pais = direccionPrincipal.pais;
      values.cp = direccionPrincipal.cp;
      setEsPrincipal(true);
    } else {
      values.calle = "";
      values.municipio = {};
      values.provincia = {};
      values.pais = "";
      values.cp = "";
      setEsPrincipal(false);
    }
  }
  function cambiarDatosContacto(ev) {
    
    tipoContacto = ev.target.value;
    if (tipoContacto === "clienteLogged") {
      values.nombreEnvio = clienteLogged.datoscliente.nombre;
      values.apellidosEnvio = clienteLogged.datoscliente.apellidos;
      values.telefonoContacto = clienteLogged.datoscliente.telefono;
      values.emailEnvio = clienteLogged.datoscliente.cuenta.email;
      setContactoCliente(true);
    } else {
      values.nombreEnvio = "";
      values.apellidosEnvio = "";
      values.telefonoContacto = "";
      values.emailEnvio = "";
      setContactoCliente(false);
    }
  }
  //#endregion

  //#region Efectos
  useEffect(() => {
    if (values.provincia) {
      pedidoRESTService.recuperarMunicipios(values.provincia.CPRO).then(
        (data) => {
          setMunicipios(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [values.provincia]);
  //#endregion
  return (
    <>
      {/*Radios para tipo de contacto */}
      <div className="p-2">
        <RadioGroup
          label="Datos de contacto"
          color="primary"
          defaultValue="clienteLogged"
          orientation="horizontal"
        >
          <Radio value="clienteLogged" onChange={cambiarDatosContacto}>
            Datos del cliente
          </Radio>
          <Radio value="otraPersona" onChange={cambiarDatosContacto}>
            Otra persona
          </Radio>
        </RadioGroup>
      </div>
      {/*Inputs para los datos de contacto. Se muestran solo si contactoCliente es false */}
      {!contactoCliente && (
        <div className="p-2">
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <Field name="nombreEnvio">
                {({ field}) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Nombre"
                      placeholder="Nombre"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="nombreEnvio"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-full py-2 px-2">
              <Field name="apellidosEnvio">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Apellidos"
                      placeholder="Apellidos"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="apellidosEnvio"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <Field name="telefonoContacto">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Teléfono"
                      placeholder="123456789"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="telefonoContacto"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-full py-2 px-2">
              <Field name="emailEnvio">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Email"
                      placeholder="mio@mio.es"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="emailEnvio"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
        </div>
      )}
      <div className="p-2">
        {/*Radios para tipo de direccion de entrega */}
        <RadioGroup
          label="Direccion de envío"
          color="primary"
          defaultValue="dirprincipal"
          orientation="horizontal"
        >
          <Radio
            value="dirprincipal"
            description={direccionPrincipal.calle}
            onChange={cambiarDireccion}
          >
            Dirección principal
          </Radio>
          <Radio
            value="otradir"
            description="Otra dirección"
            onChange={cambiarDireccion}
          >
            Otra dirección
          </Radio>
        </RadioGroup>
      </div>
      {/*Inputs para la dirección de envío. Se muestran solo si esPrincipal es false */}
      {!esPrincipal && (
        <div className="p-2">
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <Field name="calle">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Calle"
                      placeholder="C// Falsa 123"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="calle"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
          <div className="p-2 flex">
            <div className="w-full py-2 px-2">
              <Field name="cp">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Código Postal"
                      placeholder="12345"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="cp"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-full py-2 px-2">
              <Field name="pais">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="País"
                      placeholder="España"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="pais"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
          <div className="p-2 flex">
            <div className="w-full py-2 px-2">
              <Field name="provincia">
                {({ field, form }) => (
                  <div className="py-2">
                    <Select
                      {...field}
                      color="primary"
                      label="Provincia"
                      placeholder="Seleccione una provincia"
                      size="lg"
                      onChange={(event) => {
                        console.log("Buscando provincia:", event.target.value);
                        const selectedProv = provincias.provincias.find(
                          (prov) => prov.CPRO === event.target.value
                        );
                        form.setFieldValue(field.name, selectedProv);
                      }}
                    >
                      {provincias.provincias.map((prov) => (
                        <SelectItem key={prov.CPRO} value={prov.CPRO}>
                          {prov.PRO}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="provincia"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-full py-2 px-2">
              <Field name="municipio">
                {({ field, form }) => (
                  <div className="py-2">
                    <Select
                      {...field}
                      color="primary"
                      label="Municipio"
                      placeholder="Seleccione un municipio"
                      size="lg"
                      onChange={(event) => {
                        console.log("Buscando Municipio:", event.target.value);
                        const selectedMuni = municipios.municipios.find(
                          (muni) => muni.CMUM === event.target.value
                        );
                        form.setFieldValue(field.name, selectedMuni);
                      }}
                    >
                      {/*Si municipios no es undefined o null */}
                      {municipios.municipios &&
                        municipios.municipios.map((mun) => (
                          <SelectItem key={mun.CMUM} value={mun.CMUM}>
                            {mun.DMUN50}
                          </SelectItem>
                        ))}
                    </Select>
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="municipio"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default DatosEntrega;
