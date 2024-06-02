import { useState, useEffect } from "react";
import {
  Divider,
  Button,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import MiniDireccion from "./MiniDireccion";
import ModalNuevaDireccion from "./ModalNuevaDireccion";

function DireccionesCliente({ direcciones }) {
  //#region variables de estado
  const [direccionModal, setDireccionModal] = useState({});
  const [operacion, setOperacion] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //#endregion

  //#region funciones

  //#endregion

  //#region efectos

  //#endregion

  return (
    <div>
      <div>
        {direcciones.map((direccion) => (
          <div key={direccion._id} className="flex flex-col">
            <MiniDireccion
              direccion={direccion}
              setDireccionModal={setDireccionModal}
              setOperacion={setOperacion}
              onOpenChange={onOpenChange}
            />
          </div>
        ))}
      </div>
      <div className="mt-2">
        <Divider />
      </div>
      <div>
        <Button
          block
          color="primary"
          className="mt-2"
          onPress={() => {
            setDireccionModal({
              calle: "",
              cp: "",
              pais: "",
              provincia: {
                CPRO: "",
                PRO: "",
              },
              municipio: {
                CPRO: "",
                CMUM: "",
                DMUN50: "",
                CUN: "",
              },
            });
            setOperacion("Añadir");
            onOpenChange();
          }}
        >
          Añadir dirección
        </Button>
      </div>
      <div className="px-5">
        <Modal
          title="Nueva dirección"
          size="2xl"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          scrollBehavior="inside"
          hideCloseButton={true}
        >
          <ModalContent>
            <ModalNuevaDireccion
              direccion={direccionModal}
              operacion={operacion}
              onOpenChange={onOpenChange}
            />
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
}
export default DireccionesCliente;
