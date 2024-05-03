import { useEffect, useState } from "react";
import { Radio, RadioGroup, Input } from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useFormikContext, Field, ErrorMessage } from "formik";
import pedidoRESTService from "../../servicios/restPedido";

function DatosEntrega() {
  const { clienteLogged } = useClienteLoggedContext();
  const [provincias, setProvincias] = useState([]);
  const direccionPrincipal = clienteLogged.datoscliente.direcciones.find(
    (dir) => dir.esPrincipal
  );
  
  console.log(provincias);
  let tipoDireccion = "dirprincipal";
  const { values } = useFormikContext();
  const [esPrincipal, setEsPrincipal] = useState(true);
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
      values.municipio = "";
      values.provincia = "";
      values.pais = "";
      values.cp = "";
      setEsPrincipal(false);
    }
  }
  useEffect(() => {
    pedidoRESTService.recuperarProvincias().then((provs) => {
      setProvincias(provs);
    });
  }, []);
  return (
    <>
      <div className="py-5 px-5">
        {/*Radios para tipo de direccion de entrega */}
        <RadioGroup
          label="Direccion de envío"
          color="primary"
          defaultValue="dirprincipal"
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
        <div className="py-5 px-5">
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
      )}
    </>
  );
}
export default DatosEntrega;
