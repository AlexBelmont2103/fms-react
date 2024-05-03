import { useState } from "react";
import { Radio, RadioGroup, Input } from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useFormikContext } from 'formik';
function DatosEntrega() {
    const { clienteLogged } = useClienteLoggedContext();
    const direccionPrincipal = clienteLogged.datoscliente.direcciones.find(dir => dir.esPrincipal);
    const {values} = useFormikContext();
    const [esPrincipal, setEsPrincipal] = useState(true);
    function cambiarDireccion(ev) {
        //Comprobar el value del radio group
        //Si es dirprincipal, setear los valores del yup
        //Si es otradir, setear los valores del yup a vacio
        console.log(ev.target.value);
        let tipoDireccion = ev.target.value;
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
        console.log(values);

    }
  return (
    <div className="py-5 px-5">
      {/*Radios para tipo de direccion de entrega */}
      <RadioGroup label="Direccion de envío" color="secondary" defaultValue="dirprincipal">
        <Radio value="dirprincipal" description={direccionPrincipal.calle} onChange={cambiarDireccion} >
          Dirección principal
        </Radio>
        <Radio value="otradir" description="Otra dirección" onChange={cambiarDireccion}>
          Otra dirección
        </Radio>
      </RadioGroup>
    </div>
  );
}
export default DatosEntrega;
