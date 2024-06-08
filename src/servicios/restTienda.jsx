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
    RecuperarAlbumes: async function (operacion, busqueda) {
        try {
            let url = 'http://localhost:5000/api/Tienda/';
            if (operacion === 'genero') {
                url += 'RecuperarAlbumesGenero/' + busqueda;
            }else if (operacion === 'artista') {
                url += 'RecuperarAlbumesArtista/' + busqueda;
            }else{
                url += 'RecuperarAlbumes';
            }
            console.log('url: ', url);
            let response = await fetch(url, {
                method: 'GET',
            });
            return await response.json();
        } catch (error) {
            console.log('Error al intentar recuperar albumes...', error);
        }
    },
    RecuperarAlbum: async function (id) {
        try {
            let response = await fetch('http://localhost:5000/api/Tienda/RecuperarAlbum/' + id, {
                method: 'GET',
            });
            return await response.json();
        } catch (error) {
            console.log('Error al intentar recuperar album...', error);
        }
    },
};

export default tiendaRESTService;