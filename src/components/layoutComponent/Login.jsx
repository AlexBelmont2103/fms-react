import { Formik } from "formik";
import * as Yup from "yup";
import { useDarkMode } from "../../contextProviders/darkModeContext";
function Login() {
  const { darkMode } = useDarkMode();
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
    <div
      className={
        darkMode ? "purple-light flex flex-wrap" : "purple-dark flex flex-wrap"
      }
    >
      <div>
        <h3>Inicia sesión en FullMetalStore</h3>
        <p>
          Bienvenido a la tienda nº1 de metal en España. Por favor, completa el
          formulario y procura no cagarla
        </p>
      </div>
    </div>
  );
}

export default Login;
