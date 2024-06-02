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
    fechaNacimiento: Yup.date().required("La fecha de nacimiento es requerida"),
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
          fechaNacimiento: cliente.fechaNacimiento.split("T")[0] || "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          // Aquí puedes llamar a la función que actualiza los datos del cliente
          actualizarCliente(values);
          // Por ejemplo: actualizarCliente(values);
          setSubmitting(false);
        }}
      >
        <Form >
          <div className="flex flex-wrap">
            <div className="w-60 md:w-1/2 px-2 py-2">
              <Field name="email">
                {({ field, form }) => (
                  <Input
                    {...field}
                    label="Email"
                    color="primary"
                    variant="underlined"
                    className="w-50 px-3 py-2 rounded-md"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  />
                )}
              </Field>
              <div className="px-5">
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className="w-60 md:w-1/2 px-2 py-2">
              <Field name="confirmEmail">
                {({ field, form }) => (
                  <Input
                    {...field}
                    label="Confirmar Email"
                    color="primary"
                    variant="underlined"
                    className="w-50 px-3 py-2 rounded-md"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  />
                )}
              </Field>
              <div className="px-5">
                <ErrorMessage
                  name="confirmEmail"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className="w-60 md:w-1/2 px-2 py-2">
              <Field name="nombre">
                {({ field, form }) => (
                  <Input
                    {...field}
                    label="Nombre"
                    color="primary"
                    variant="underlined"
                    className="w-50 px-3 py-2 rounded-md"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  />
                )}
              </Field>
              <div className="px-5">
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className="w-60 md:w-1/2 px-2 py-2">
              <Field name="apellidos">
                {({ field, form }) => (
                  <Input
                    {...field}
                    label="Apellidos"
                    color="primary"
                    variant="underlined"
                    className="w-50 px-3 py-2 rounded-md"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  />
                )}
              </Field>
              <div className="px-5">
                <ErrorMessage
                  name="apellidos"
                  component="div"
                  className="text-red-500"
                />
              </div>
            </div>
            <div className="w-60 md:w-1/2 px-5 py-2">
              <Field name="fechaNacimiento">
                {({ field, form }) => (
                  <label htmlFor="fechaNacimiento" className="text-small">
                    Fecha de nacimiento
                    <br />
                    <input
                      {...field}
                      type="date"
                      className="w-50 px-3 py-2 border border-gray-300 rounded-md"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </label>
                )}
              </Field>
              <div className="px-5">
                <ErrorMessage
                  name="fechaNacimiento"
                  component="div"
                  className="text-danger-500"
                />
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
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default FormDatosCliente;
