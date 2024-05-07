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
function DatosFactura({ pedido, setPedido, onChange }) {
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
    if (mismosDatos) {
      //Tengo que poner los mismos datos que en el envio
      setPedido({
        ...pedido,
        direccionFactura: pedido.direccionEnvio,
        nombreFactura: pedido.nombreEnvio,
        apellidosFactura: pedido.apellidosEnvio,
      });
    } else {
      //Tengo que poner otros datos
      setPedido({
        ...pedido,
        direccionFactura: {
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
            CUN: "",
            DMUN50: "",
          },
        },
        nombreFactura: "",
        apellidosFactura: "",
      });
    }
  }
  //#endregion

  //#region Efectos
  useEffect(() => {
    if (pedido.direccionFactura.provinciaFactura) {
      pedidoRESTService
        .recuperarMunicipios(pedido.direccionFactura.provinciaFactura.CPRO)
        .then(
          (data) => {
            setMunicipios(data);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }, [pedido.direccionFactura.provinciaFactura]);
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
              <div className="py-2">
                <Input
                  name="nombreFactura"
                  variant="underlined"
                  color="primary"
                  label="Nombre"
                  placeholder="Nombre"
                  width="100%"
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Input
                  name="apellidosFactura"
                  variant="underlined"
                  color="primary"
                  label="Apellidos"
                  placeholder="Apellidos"
                  width="100%"
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Input
                  name="calleFactura"
                  variant="underlined"
                  color="primary"
                  label="Calle"
                  placeholder="C// Falsa 123"
                  width="100%"
                  value={pedido.direccionFactura.calle}
                  onChange={(event) => {
                    setPedido((prevPedido) => ({
                      ...prevPedido,
                      direccionFactura: {
                        ...prevPedido.direccionFactura,
                        calle: event.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Input
                  name="cpFactura"
                  variant="underlined"
                  color="primary"
                  label="Código Postal"
                  placeholder="12345"
                  width="100%"
                  value={pedido.direccionFactura.cp}
                  onChange={(event) => {
                    setPedido((prevPedido) => ({
                      ...prevPedido,
                      direccionFactura: {
                        ...prevPedido.direccionFactura,
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
                  name="paisFactura"
                  variant="underlined"
                  color="primary"
                  label="País"
                  placeholder="España"
                  width="100%"
                  value={pedido.direccionFactura.pais}
                  onChange={(event) => {
                    setPedido((prevPedido) => ({
                      ...prevPedido,
                      direccionFactura: {
                        ...prevPedido.direccionFactura,
                        pais: event.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Select
                  name="provinciaFactura"
                  color="primary"
                  label="Provincia"
                  placeholder="Seleccione una provincia"
                  size="lg"
                  onChange={(event) => {
                    const selectedProv = provincias.provincias.find(
                      (prov) => prov.CPRO === event.target.value
                    );
                    setPedido((prevPedido) => ({
                      ...prevPedido,
                      direccionFactura: {
                        ...prevPedido.direccionFactura,
                        provinciaFactura: selectedProv,
                      },
                    }));
                  }}
                >
                  {provincias.provincias.map((prov) => (
                    <SelectItem key={prov.CPRO} value={prov.CPRO}>
                      {prov.PRO}
                    </SelectItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className="w-full py-2 px-2">
              <div className="py-2">
                <Select
                  name="municipioFactura"
                  color="primary"
                  label="Municipio"
                  placeholder="Seleccione un municipio"
                  size="lg"
                  onChange={(event) => {
                    const selectedMuni = municipios.municipios.find(
                      (muni) => muni.CMUM === event.target.value
                    );
                    setPedido((prevPedido) => ({
                      ...prevPedido,
                      direccionFactura: {
                        ...prevPedido.direccionFactura,
                        municipioFactura: selectedMuni,
                      },
                    }));
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default DatosFactura;
