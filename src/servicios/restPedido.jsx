let pedidoRESTService = {
  recuperarProvincias: async function () {
    const respuesta = await fetch('http://localhost:5000/api/Pedido/RecuperarProvincias')
    const provincias = await respuesta.json();
    return provincias;
  },
  recuperarMunicipios: async function (CPRO) {
    
    try {
      const respuesta = await fetch(
        `http://localhost:5000/api/Pedido/RecuperarMunicipios/${CPRO}`
      );
      const municipios = await respuesta.json();
      console.log(municipios);
      return municipios;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};

export default pedidoRESTService;
