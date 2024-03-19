import { useState, useEffect } from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import { Input, Button, Checkbox } from "@nextui-org/react";
import EyeFilledIcon from "../../uiComponents/EyeFilledIcon";
import EyeSlashFilledIcon from "../../uiComponents/EyeSlashFilledIcon";
import clienteRESTService from "../../servicios/restCliente";
function RegistroForm() {
  let { isValid, values } = useFormikContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repasswordVisible, setRepasswordVisible] = useState(false);

  useEffect(() => {
    // Comprueba si el email ya está registrado
    if (values.email) {
        const checkEmail = async () => {
          let _resp = await clienteRESTService.comprobarEmail(values.email);
          if (_resp.codigo === 0) {
            document.getElementById('EmailRegistrado').classList.remove('hidden');
            isValid = false;
          }
        };
        //LLamamos a la funcion cuando el valor del campo email tenga un formato de email
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (emailRegex.test(values.email)) checkEmail();
        
    }
  }, [values.email]);
  useEffect(() => {
    // Comprueba si el login ya está registrado
    if (values.login) {
        const checkLogin = async () => {
            let _resp = await clienteRESTService.comprobarLogin(values.login);
            if (_resp.codigo === 0) {
                document.getElementById('LoginRegistrado').classList.remove('hidden');
                isValid = false;
            }
        };
        checkLogin();
    }
    }, [values.login]);
  const toggleVisibility = (event) => {
    if (event.target.name === "togglePassword")
      setPasswordVisible(!passwordVisible);
    if (event.target.name === "toggleRepassword")
      setRepasswordVisible(!repasswordVisible);
  };
  return (
    <>
    {isValid}
      <Form className="space-y-4 space-x-4">
        <div className="flex flex-wrap -mx-2">
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="email">
              {({ field, form }) => (
                <Input
                  {...field}
                  label="Email"
                  color="secondary"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.value)
                  }
                />
              )}
            </Field>
            <ErrorMessage name="email" component="div" className="text-red-500" />
            <div id='EmailRegistrado' className="hidden text-red-500">*Email ya registrado</div>
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="repemail">
              {({ field, form }) => (
                <Input
                  {...field}
                  label="Repite el Email"
                  color="secondary"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.value)
                  }
                />
              )}
            </Field>
            <ErrorMessage name="repemail" component="div" className="text-red-500" />
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="password">
              {({ field, form }) => (
                <Input
                  {...field}
                  label="Contaseña"
                  type={passwordVisible ? "text" : "password"}
                  color="secondary"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.value)
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      name="togglePassword"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {passwordVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            </Field>
            <ErrorMessage name="password" component="div" className="text-red-500" />
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="repassword">
              {({ field, form }) => (
                <Input
                  {...field}
                  label="Repite la contraseña"
                  type={repasswordVisible ? "text" : "password"}
                  color="secondary"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.value)
                  }
                  endContent={
                    <button
                      className="focus:outline-none"
                      name="toggleRepassword"
                      type="button"
                      onClick={toggleVisibility}
                    >
                      {repasswordVisible ? (
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                />
              )}
            </Field>
            <ErrorMessage name="repassword" component="div" className="text-red-500" />
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="nombre">
              {({ field, form }) => (
                <Input
                  {...field}
                  label="Nombre"
                  color="secondary"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.value)
                  }
                />
              )}
            </Field>
            <ErrorMessage name="nombre" component="div" className="text-red-500" />
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="apellidos">
              {({ field, form }) => (
                <Input
                  {...field}
                  label="Apellidos"
                  color="secondary"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.value)
                  }
                />
              )}
            </Field>
            <ErrorMessage name="apellidos" component="div" className="text-red-500" />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <Field name="telefono">
              {({ field, form }) => (
                <Input
                  {...field}
                  label="Teléfono"
                  color="secondary"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.value)
                  }
                />
              )}
            </Field>
            <ErrorMessage name="telefono" component="div" className="text-red-500" />
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="login">
              {({ field, form }) => (
                <Input
                  {...field}
                  label="Nombre de usuario"
                  color="secondary"
                  onChange={(event) =>
                    form.setFieldValue(field.name, event.target.value)
                  }
                />
              )}
            </Field>
            <ErrorMessage name="login" component="div" className="text-red-500" />
            <div id='LoginRegistrado' className="hidden text-red-500">*Login ya registrado</div>
          </div>
          <div className="w-full md:w-1/2 px-2">
            <Field name="fechaNacimiento">
              {({ field, form }) => (
                <label htmlFor="fechaNacimiento">
                  Fecha de nacimiento
                  <input
                    type="date"
                    name="fechaNacimiento"
                    onChange={(event) => {
                      const date = event.currentTarget.value;
                      form.setFieldValue(field.name, date);
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </label>
              )}
            </Field>
            <ErrorMessage name="fechaNacimiento" component="div" className="text-red-500" />
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="imagenAvatar">
              {({ field, form }) => (
                <label htmlFor="imagenAvatar">
                  Foto de perfil
                  <input
                    type="file"
                    name="imagenAvatar"
                    onChange={(event) => {
                      const file = event.currentTarget.files[0];
                      console.log(file);
                      form.setFieldValue(field.name, file); // Almacena solo el nombre del archivo
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </label>
              )}
            </Field>
            <ErrorMessage name="fotoPerfil" component="div" className="text-red-500" />
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Field name="terminosYCondiciones">
              {({ field, form }) => (
                <label htmlFor="terminosYCondiciones">
                  Acepto los términos y condiciones
                  <Checkbox
                    color="secondary"
                    onChange={(event) =>
                      form.setFieldValue(field.name, event.target.value)
                    }
                  ></Checkbox>
                </label>
              )}
            </Field>
            <ErrorMessage name="terminosYCondiciones" component="div" />
          </div>
          <div className="w-full md:w-1/2 px-2 py-2">
            <Button color="secondary" type="submit" disabled={!isValid}>
              Registrarse
            </Button>
          </div>
        </div>
      </Form>
    </>
  );
}
export default RegistroForm;
