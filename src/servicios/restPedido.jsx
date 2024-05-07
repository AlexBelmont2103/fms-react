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
      return {};
    }
  },
  finalizarPedido: async function (pedido,token) { 
    try {
      const respuesta = await fetch('http://localhost:5000/api/Pedido/FinalizarPedido', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(pedido)
      });
      const pedidoFinalizado = await respuesta.json();
      console.log(pedidoFinalizado);
      return pedidoFinalizado;
    } catch (error) {
      console.log(error);
      return {};
    }
  }
};

export default pedidoRESTService;
