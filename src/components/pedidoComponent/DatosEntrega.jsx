import { useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import pedidoRESTService from "../../servicios/restPedido";
import { useLoaderData } from "react-router-dom";

function DatosEntrega({ pedido, setPedido, onChange }) {
  //#region Variables de estado
  const { clienteLogged } = useClienteLoggedContext();
  const provincias = useLoaderData();
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
      pedido.direccionEnvio = direccionPrincipal;
      setEsPrincipal(true);
    } else {
      pedido.direccionEnvio = {
        calle: "",
        cp: "",
        pais: "",
        provincia: {
          CCOM: "",
          CPRO: "",
          PRO: "",
        },
        municipio: {
          CMUM: "",
          CPRO: "",
          DMUN50: "",
        },
      };
      setEsPrincipal(false);
    }
  }
  const cambiarDatosContacto = (ev) => {
    const tipoContacto = ev.target.value;
    if (tipoContacto === "clienteLogged") {
      setPedido((prevPedido) => ({
        ...prevPedido,
        nombreEnvio: clienteLogged.datoscliente.nombre,
        apellidosEnvio: clienteLogged.datoscliente.apellidos,
        telefonoContacto: clienteLogged.datoscliente.telefono,
        emailEnvio: clienteLogged.datoscliente.cuenta.email,
      }));
      setContactoCliente(true);
    } else {
      setPedido((prevPedido) => ({
        ...prevPedido,
        nombreEnvio: "",
        apellidosEnvio: "",
        telefonoContacto: "",
        emailEnvio: "",
      }));
      setContactoCliente(false);
    }
  };
  //#endregion

  //#region Efectos
  useEffect(() => {
    if (pedido.direccionEnvio.provincia) {
      pedidoRESTService
        .recuperarMunicipios(pedido.direccionEnvio.provincia.CPRO)
        .then(
          (data) => {
            setMunicipios(data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [pedido.direccionEnvio.provincia]);
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
              <div className="py-2">
                <Input
                  name="nombreEnvio"
                  variant="underlined"
                  color="primary"
                  label="Nombre"
                  placeholder="Nombre"
                  width="100%"
                  value={pedido.nombreEnvio}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Input
                  name="apellidosEnvio"
                  variant="underlined"
                  color="primary"
                  label="Apellidos"
                  placeholder="Apellidos"
                  width="100%"
                  value={pedido.apellidosEnvio}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Input
                  name="telefonoContacto"
                  variant="underlined"
                  color="primary"
                  label="Teléfono"
                  placeholder="123456789"
                  width="100%"
                  value={pedido.telefonoContacto}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Input
                  name="emailEnvio"
                  variant="underlined"
                  color="primary"
                  label="Email"
                  placeholder="mio@mio.es"
                  width="100%"
                  value={pedido.emailEnvio}
                  onChange={onChange}
                />
              </div>
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
              <div className="py-2">
                <Input
                  name="calle"
                  variant="underlined"
                  color="primary"
                  label="Calle"
                  placeholder="C// Falsa 123"
                  width="100%"
                  value={pedido.direccionEnvio.calle}
                  onChange={(event) => {
                    setPedido(prevPedido => ({
                      ...prevPedido,
                      direccionEnvio: {
                        ...prevPedido.direccionEnvio,
                        calle: event.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="p-2 flex">
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Input
                  name="cp"
                  variant="underlined"
                  color="primary"
                  label="Código Postal"
                  placeholder="12345"
                  width="100%"
                  value={pedido.direccionEnvio.cp}
                  onChange={(event) => {
                    setPedido(prevPedido => ({
                      ...prevPedido,
                      direccionEnvio: {
                        ...prevPedido.direccionEnvio,
                        cp: event.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Input
                  name="pais"
                  variant="underlined"
                  color="primary"
                  label="País"
                  placeholder="España"
                  width="100%"
                  value={pedido.direccionEnvio.pais}
                  onChange={(event) => {
                    setPedido(prevPedido => ({
                      ...prevPedido,
                      direccionEnvio: {
                        ...prevPedido.direccionEnvio,
                        pais: event.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="p-2 flex">
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Select
                  name="provincia"
                  color="primary"
                  label="Provincia"
                  placeholder="Seleccione una provincia"
                  size="lg"
                  value={pedido.direccionEnvio.provincia}
                  onChange={(event) => {
                    console.log("Buscando provincia:", event.target.value);
                    const selectedProv = provincias.provincias.find(
                      (prov) => prov.CPRO === event.target.value
                    );
                    setPedido((prevPedido) => ({
                      ...prevPedido,
                      direccionEnvio: {
                        ...prevPedido.direccionEnvio,
                        provincia: selectedProv,
                      },
                    }));
                  }}
                >
                  {provincias.provincias.map((prov) => (
                    <SelectItem key={prov.CPRO} value={prov}>
                      {prov.PRO}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Select
                  name="municipio"
                  color="primary"
                  label="Municipio"
                  placeholder="Seleccione un municipio"
                  size="lg"
                  value={pedido.direccionEnvio.municipio}
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
                      <SelectItem key={mun.CMUM} value={mun}>
                        {mun.DMUN50}
                      </SelectItem>
                    ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default DatosEntrega;
