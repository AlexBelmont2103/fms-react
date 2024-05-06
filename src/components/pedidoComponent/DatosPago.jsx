import { useState, useEffect } from "react";
import { Radio, RadioGroup, Input } from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
import { useFormikContext, Field, ErrorMessage } from "formik";
function DatosPago({ values }) {
  //#region Variables de estado
  const { clienteLogged } = useClienteLoggedContext();
  const [tipoPago, setTipoPago] = useState("pagoTarjeta");
  //#endregion
  //#region Funciones
  function cambiarTipoPago(ev) {
    setTipoPago(ev.target.value);
  }
  //#endregion
  //#region Efectos

  //#endregion
  return (
    <>
      <div className="flex flex-row px-2">
        <RadioGroup
          label="Datos de pago"
          name="mismosDatos"
          value={tipoPago}
          orientation="horizontal"
        >
          <Radio value={"pagoTarjeta"} onChange={cambiarTipoPago}>
            Pago con Tarjeta
          </Radio>
          <Radio value={"pagoPaypal"} onChange={cambiarTipoPago}>
            Pago con Paypal
          </Radio>
        </RadioGroup>
      </div>
      {tipoPago === "pagoTarjeta" && (
        <div className="p-2">
          <div className="flex flex-row">
            <div className="w-2/3 px-2 py-2">
              <Field name="numerocard">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Número de la tarjeta"
                      placeholder="1234123412341234"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="numerocard"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-1/4 px-2 py-2">
              <Field name="mescard">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Mes de caducidad"
                      placeholder="MM"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="mescard"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-1/4 px-2 py-2">
              <Field name="aniocard">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Año de caducidad"
                      placeholder="AA"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="aniocard"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
            <div className="w-1/4 px-2 py-2">
              <Field name="cvv">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="CVV"
                      placeholder="123"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="cvv"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-2/3 px-2 py-2">
              <Field name="nombrebancocard">
                {({ field, form }) => (
                  <div className="py-2">
                    <Input
                      {...field}
                      variant="underlined"
                      color="primary"
                      label="Nombre de la tarjeta"
                      placeholder="Luke Skywalker"
                      width="100%"
                      onChange={(event) =>
                        form.setFieldValue(field.name, event.target.value)
                      }
                    />
                  </div>
                )}
              </Field>
              <ErrorMessage
                name="nombrebancocard"
                component="div"
                className="text-red-500 px-3"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DatosPago;
