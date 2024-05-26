let adminRESTService={
    recuperarColecciones: async function(){
        try{
            let response = await fetch('http://localhost:5000/api/Admin/RecuperarColecciones');
            return await response.json();
        }catch(error){
            console.log('Error al intentar recuperar colecciones...',error);
        }
    },
};

export default adminRESTService;