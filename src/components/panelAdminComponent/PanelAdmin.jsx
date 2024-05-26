import {useState, useEffect} from 'react';
import adminRESTService from '../../servicios/restAdmin';

function PanelAdmin(){
    //#region variables de estado
    const [colecciones, setColecciones] = useState([]);
    //#endregion

    //#region funciones


    //#endregion

    //#region efectos
    //Efecto para recuperar las colecciones
    useEffect(()=>{
        adminRESTService.recuperarColecciones()
        .then((data)=>{
            console.log('Colecciones recuperadas...',data);
            setColecciones(data.otrosdatos);
        });
    },[]);
    //#endregion
    return(
        <div>
            <h1>Panel de Administrador</h1>

        </div>
    )
};

export default PanelAdmin;