import { Formik } from "formik";
import * as Yup from "yup";
import LoginForm from "../zonaCliente/LoginForm";
import clienteRESTService from "../../servicios/restCliente";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
function Login() {
  const { dispatch } = useClienteLoggedContext();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Introduce un email válido")
      .required("El email es obligatorio"),
    password: Yup.string()
      .required("La contraseña es obligatoria")
      .matches(
        /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,}$/,
        "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial"
      ),
  });
  return (
    <div>
      <div className="justify-center">
        <h3>Inicia sesión en FullMetalStore</h3>
        <div id="errorLogin" className="hidden text-red-500">
          Error al iniciar sesión
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            let _resp = await clienteRESTService.login(values);
            if (_resp.codigo === 0) {
              let payload = {
                datoscliente: _resp.datoscliente,
                tokensesion: _resp.tokensesion,
              };
              dispatch({ type: "CLIENTE_LOGIN", payload: payload });
            } else {
              document.getElementById("errorLogin").classList.remove("hidden");
            }
          }}
        >
          <LoginForm />
        </Formik>
      </div>
    </div>
  );
}

export default Login;
