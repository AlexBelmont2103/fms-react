import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { Formik } from "formik";
import {useNavigate} from "react-router-dom";
import clienteRESTService from "../../servicios/restCliente";
import * as Yup from "yup";
import RegistroForm from "../zonaCliente/RegistroForm";
function ModalRegistro(props) {
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Introduce un email válido")
      .required("El email es obligatorio"),
    repemail: Yup.string()
      .oneOf([Yup.ref("email"), null], "Los emails no coinciden")
      .required("Repite el email"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .matches(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
      ),
    repassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Las contraseñas no coinciden")
      .required("Repite la contraseña")
      .matches(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
      ),
    nombre: Yup.string()
      .required("El nombre es obligatorio")
      .max(50, "El nombre no puede tener más de 50 caracteres")
      .min(3, "El nombre debe tener al menos 3 caracteres"),
    apellidos: Yup.string()
      .required("Los apellidos son obligatorios")
      .max(250, "Los apellidos no pueden tener más de 250 caracteres")
      .min(3, "Los apellidos deben tener al menos 3 caracteres"),
    telefono: Yup.string()
      .matches(/^[0-9]{9}$/, "El teléfono debe tener 9 dígitos")
      .nullable(),
    login: Yup.string()
      .required("El nombre de usuario es obligatorio")
      .max(50, "El nombre de usuario no puede tener más de 50 caracteres")
      .min(6, "El nombre de usuario debe tener al menos 6 caracteres"),
    fechaNacimiento: Yup.date().nullable(),
    fotoPerfil: Yup.mixed().nullable(),
    terminosYCondiciones: Yup.boolean().oneOf(
      [true],
      "Debes aceptar los términos y condiciones"
    ),
  });
  return (
    <>
      <ModalHeader>Registro</ModalHeader>
      <ModalBody>
        <div className="flex flex-wrap">
          <div>
            <h3>Registro en FullMetalStore</h3>
            <p>
              Bienvenido a la tienda nº1 de metal en España. Por favor, completa
              el formulario y procura no cagarla
            </p>
          </div>
          <Formik
            initialValues={{
              email: "",
              repemail: "",
              password: "",
              repassword: "",
              nombre: "",
              apellidos: "",
              telefono: "",
              login: "",
              fechaNacimiento: "",
              imagenAvatar: "",
              terminosYCondiciones: false,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              //Cerrar el modal
              props.onOpenChange();
              let _respuestaServer = await clienteRESTService.registro(values);
              if(_respuestaServer.codigo===0){
                
                navigate(`/Cliente/RegistroOk/${values.email}`);
            }}}
          >
            <RegistroForm />
          </Formik>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={props.onOpenChange}>
          Cerrar
        </Button>
      </ModalFooter>
    </>
  );
}

export default ModalRegistro;
