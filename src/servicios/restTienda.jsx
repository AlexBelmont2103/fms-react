let tiendaRESTService = {
    RecuperarGeneros: async function () {
        try {
            let response = await fetch('http://localhost:5000/api/Tienda/RecuperarGeneros', {
                method: 'GET',
            });
            return await response.json();
        } catch (error) {
            console.log('Error al intentar recuperar generos...', error);
        }
    },
    RecuperarAlbumes: async function (genero) {
        try {
            let response = await fetch('http://localhost:5000/api/Tienda/RecuperarAlbumes?genero=' + genero, {
                method: 'GET',
            });
            return await response.json();
        } catch (error) {
            console.log('Error al intentar recuperar albumes...', error);
        }
    },
};

export default tiendaRESTService;