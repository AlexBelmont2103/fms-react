import { useState, useEffect } from "react";
import { Tabs, Tab, Card, CardBody, Button } from "@nextui-org/react";
import adminRESTService from "../../servicios/restAdmin";
import AdminGeneros from "./AdminGeneros";
import AdminAlbumes from "./AdminAlbumes";

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
    //Efecto para cargar los albumes
    useEffect(() => {
        const cargarAlbumes = async () => {
            let response = await adminRESTService.recuperarAlbumes();
            setAlbumes(response.datosalbumes);
        }
        cargarAlbumes();
    }, []);
  //#endregion
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options">
        <Tab key="generos" title="Géneros">
          <AdminGeneros generos={generos} setGeneros={setGeneros}/>
        </Tab>
        <Tab key="albumes" title="Álbumes">
            <AdminAlbumes albumes={albumes} setAlbumes={setAlbumes}/>
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
