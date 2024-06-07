import { useState, useEffect } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import adminRESTService from "../../servicios/restAdmin";

function PanelAdmin() {
  //#region variables de estado
  const [generos, setGeneros] = useState([]);
  const [albumes, setAlbumes] = useState([]);

  //#endregion

  //#region funciones

  //#endregion

  //#region efectos
  //Efecto para cargar los generos
    useEffect(() => {
        const cargarGeneros = async () => {
            let response = await adminRESTService.recuperarGeneros();
            setGeneros(response.datosgeneros);
            
        }
        cargarGeneros();
    }, []);

  //#endregion
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="generos" title="Géneros">
          <Card>
            <CardBody>
              {generos.map((genero) => (
                <div key={genero._id}>
                  <p>{genero.nombre}</p>
                </div>
              ))}
            </CardBody>
          </Card>
        </Tab>
        <Tab key="albumes" title="Álbumes">
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab key="comentarios" title="Comentarios">
          <Card>
            <CardBody>
              Próximamente...
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
}

export default PanelAdmin;
