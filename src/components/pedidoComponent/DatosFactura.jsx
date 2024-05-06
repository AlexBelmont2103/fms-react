import { useState, useEffect } from "react";
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
function DatosFactura({ values }) {
  //#region Variables de estado
  const { clienteLogged } = useClienteLoggedContext();
  const provincias = useLoaderData();
  const [municipios, setMunicipios] = useState({});

  const [mismosDatos, setMismosDatos] = useState(true);
  const direccionPrincipal = clienteLogged.datoscliente.direcciones.find(
    (dir) => dir.esPrincipal
  );
  let tipoDireccion = "dirprincipal";
  let tipoContacto = "clienteLogged";
  const [esPrincipal, setEsPrincipal] = useState(true);
  const [contactoCliente, setContactoCliente] = useState(true);
  //#endregion
  //#region Funciones
  function cambiarDatosFactura(ev) {
    setMismosDatos(!mismosDatos);
  }
  //#endregion

  //#region Efectos
  useEffect(() => {
    if (values.provinciaFactura) {
      pedidoRESTService.recuperarMunicipios(values.provinciaFactura.CPRO).then(
        (data) => {
          setMunicipios(data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [values.provinciaFactura]);
  //#endregion
  return (
    <>
      <div className="flex flex-col w-full px-2">
        <RadioGroup
          label="Datos de facturación"
          name="mismosDatos"
          value={mismosDatos}
          orientation="horizontal"
        >
          <Radio value={true} onChange={cambiarDatosFactura}>
            Usar mismos datos que en la entrega
          </Radio>
          <Radio value={false} onChange={cambiarDatosFactura}>
            Usar otros datos
          </Radio>
        </RadioGroup>
      </div>
      {!mismosDatos && (
        <div className="p-2">
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <Field name="nombreFactura">
                {({ field, form }) => (
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
                name="nombreFactura"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-full py-2 px-2">
              <Field name="apellidosFactura">
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
                name="apellidosFactura"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <Field name="calleFactura">
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
                name="calleFactura"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <Field name="cpFactura">
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
                name="cpFactura"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-full py-2 px-2">
              <Field name="paisFactura">
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
                name="paisFactura"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <Field name="provinciaFactura">
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
                        form.setFieldValue(field.name, selectedProv.CPRO); // Aquí está el cambio
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
              <Field name="municipioFactura">
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
export default DatosFactura;
