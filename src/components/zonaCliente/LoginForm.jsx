import { useState, useEffect } from "react";
import { Form, Field, ErrorMessage, useFormikContext } from "formik";
import { Input, Button } from "@nextui-org/react";
import EyeFilledIcon from "../../uiComponents/EyeFilledIcon";
import EyeSlashFilledIcon from "../../uiComponents/EyeSlashFilledIcon";
import clienteRESTService from "../../servicios/restCliente";

function LoginForm() {
  let { isValid, values } = useFormikContext();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const toggleVisibility= () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      {isValid}
      <Form>
        <div>
          <Field name="email">
            {({ field, form }) => (
              <Input
                {...field}
                label="Email"
                color="secondary"
                variant="underlined"
                onChange={(event) =>
                  form.setFieldValue(field.name, event.target.value)
                }
              />
            )}
          </Field>
          <ErrorMessage
            name="email"
            component="div"
            className="flex flex-wrap text-red-500"
          />
        </div>
        <div>
          <Field name="password">
            {({ field, form }) => (
              <Input
                {...field}
                label="Contaseña"
                type={passwordVisible ? "text" : "password"}
                color="secondary"
                variant="underlined"
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
          <div >
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>
        <Button color="secondary" type="submit" disabled={!isValid}>
          Entrar
        </Button>
      </Form>
    </>
  );
}

export default LoginForm;
