let clienteRESTService = {
    registro: async function (datosCliente) {
        const formData = new FormData();
        for(const key in datosCliente){
            formData.append(key,datosCliente[key]);
        }
        console.log('Valor del formData...',formData);
        try {
            let response = await fetch('http://localhost:5000/api/Cliente/Registro', {
                method: 'POST',
                body: formData,
            });
            return await response.json();
        }catch(error){
            console.log('Error al intentar registrar cliente...',error);
            
        }
    },
    comprobarEmail: async function (email) {
        try {
            let response = await fetch('http://localhost:5000/api/Cliente/ComprobarEmail', {
                method: 'POST',
                body: JSON.stringify({'email':email}),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return await response.json();
        }catch(error){
            console.log('Error al intentar comprobar email...',error);
        }
    },
    comprobarLogin: async function (login) {
        try {
            let response = await fetch('http://localhost:5000/api/Cliente/ComprobarLogin', {
                method: 'POST',
                body: JSON.stringify({'login':login}),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return await response.json();
        }catch(error){
            console.log('Error al intentar comprobar login...',error);
        }
    },
    login: async function (credenciales) {
        try {
            let response = await fetch('http://localhost:5000/api/Cliente/Login', {
                method: 'POST',
                body: JSON.stringify(credenciales),
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            return await response.json();
        }catch(error){
            console.log('Error al intentar loguear cliente...',error);
        }
    },
    recuperarCliente(id){
        try {
            let response = fetch('http://localhost:5000/api/Cliente/RecuperarCliente/'+id);
            return response;
        }catch(error){
            console.log('Error al intentar recuperar cliente...',error);
        }
    }
};

export default clienteRESTService;