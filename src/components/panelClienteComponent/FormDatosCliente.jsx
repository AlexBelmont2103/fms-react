import { useState, useEffect } from "react";
import { Input, Button, Divider } from "@nextui-org/react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDarkMode } from "../../contextProviders/darkModeContext";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import clienteRESTService from "../../servicios/restCliente";

function FormDatosCliente({ cliente }) {
  //#region variables de estado
  const { darkMode } = useDarkMode();
  const { clienteLogged, dispatch } = useClienteLoggedContext();
  //#endregion
  //#region funciones

  const validationSchema = Yup.object({
    nombre: Yup.string().required("El nombre es requerido"),
    apellidos: Yup.string().required("Los apellidos son requeridos"),
    email: Yup.string()
      .oneOf([Yup.ref("confirmEmail"), null], "Los emails deben coincidir")
      .email("El email no es válido")
      .required("El email es requerido"),
    confirmEmail: Yup.string()
      .oneOf([Yup.ref("email"), null], "Los emails deben coincidir")
      .required("La confirmación del email es requerida"),
  });
  async function actualizarCliente(values) {
    let response = await clienteRESTService.actualizarDatosCliente(
      values,
      clienteLogged.tokensesion
    );
    if (response.codigo === 0) {
      let payload = {
        datoscliente: response.datoscliente,
        tokensesion: response.tokensesion,
      };
      dispatch({ type: "CLIENTE_LOGIN", payload: payload });
    }
  }
  //#endregion
  //#region efectos
  //#endregion

  return (
    <div className={darkMode ? "text-black" : "text-white"}>
      <Formik
        initialValues={{
          nombre: cliente.nombre || "",
          apellidos: cliente.apellidos || "",
          email: cliente.cuenta.email || "",
          confirmEmail: cliente.cuenta.email || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Aquí puedes llamar a la función que actualiza los datos del cliente
          actualizarCliente(values);
          // Por ejemplo: actualizarCliente(values);
          setSubmitting(false);
        }}
      >
        <Form className="flex flex-wrap -mx-3">
          <div className="w-full md:w-1/2 px-3 py-2 mb-6 md:mb-0">
            <div>
              <Field name="email">
                {({ field, form }) => (
                  <Input
                    {...field}
                    label="Email"
                    color="primary"
                    variant="underlined"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  />
                )}
              </Field>
              <ErrorMessage name="email" component="div" />
            </div>
            <div>
              <Field name="nombre">
                {({ field, form }) => (
                  <Input
                    {...field}
                    label="Nombre"
                    color="primary"
                    variant="underlined"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  />
                )}
              </Field>
              <ErrorMessage name="nombre" component="div" />
            </div>
          </div>
          <div className="w-full md:w-1/2 px-3 py-2 mb-6 md:mb-0">
            <div>
              <Field name="confirmEmail">
                {({ field, form }) => (
                  <Input
                    {...field}
                    label="Confirmar Email"
                    color="primary"
                    variant="underlined"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  />
                )}
              </Field>
              <ErrorMessage name="confirmEmail" component="div" />
            </div>
            <div>
              <Field name="apellidos">
                {({ field, form }) => (
                  <Input
                    {...field}
                    label="Apellidos"
                    color="primary"
                    variant="underlined"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  />
                )}
              </Field>
              <ErrorMessage name="apellidos" component="div" />
            </div>
          </div>
          <div className="w-full px-3 py-2 mt-6">
            <Divider />
          </div>

          <div className="w-full px-3 py-2 mt-6">
            <Button variant="shadow" color="primary" type="submit">
              Actualizar
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default FormDatosCliente;
