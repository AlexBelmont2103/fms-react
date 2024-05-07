import { useState, useEffect } from "react";
import { Radio, RadioGroup, Input } from "@nextui-org/react";
import { useClienteLoggedContext } from "../../contextProviders/clienteLoggedContext";
function DatosPago({ pedido, setPedido, onChange }) {
  //#region Variables de estado
  const { clienteLogged } = useClienteLoggedContext();
  const [tipoPago, setTipoPago] = useState("pagoTarjeta");
  //#endregion
  //#region Funciones
  function cambiarTipoPago(ev) {
    setTipoPago(ev.target.value);
    setPedido({
      ...pedido,
      tipoPago: ev.target.value,
    });
    if(ev.target.value === "pagoPaypal"){
      setPedido({
        ...pedido,
        numerocard: "4242424242424242",
        mescard: "01",
        aniocard: "99",
        cvv: "123",
        nombrebancocard: "asdfg",
      });
    }
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
              <div className="py-2">
                <Input
                  name="numerocard"
                  variant="underlined"
                  color="primary"
                  label="Número de la tarjeta"
                  placeholder="1234123412341234"
                  width="100%"
                  value={pedido.numerocard}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-1/4 px-2 py-2">
              <div className="py-2">
                <Input
                  name="mescard"
                  variant="underlined"
                  color="primary"
                  label="Mes de caducidad"
                  placeholder="MM"
                  width="100%"
                  value={pedido.mescard}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-1/4 px-2 py-2">
              <div className="py-2">
                <Input
                  name="aniocard"
                  variant="underlined"
                  color="primary"
                  label="Año de caducidad"
                  placeholder="AA"
                  width="100%"
                  value={pedido.aniocard}
                  onChange={onChange}
                />
              </div>
            </div>
            <div className="w-1/4 px-2 py-2">
              <div className="py-2">
                <Input
                  name="cvv"
                  variant="underlined"
                  color="primary"
                  label="CVV"
                  placeholder="123"
                  width="100%"
                  value={pedido.cvv}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-2/3 px-2 py-2">
              <div className="py-2">
                <Input
                  name="nombrebancocard"
                  variant="underlined"
                  color="primary"
                  label="Nombre de la tarjeta"
                  placeholder="Luke Skywalker"
                  width="100%"
                  value={pedido.nombrebancocard}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DatosPago;
