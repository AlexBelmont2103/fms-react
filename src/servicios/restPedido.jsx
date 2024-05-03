let pedidoRESTService = {
  recuperarProvincias: async function () {
    //Recuperar provincias a traves de geoapi.es
    const key =
      "1f444ec01b55473e5dfba4cd58da5436cc2bd5070c109bd3315237974d9be46e";
    try {
      const respuesta = await fetch(
        `https://apiv1.geoapi.es/provincias?type=JSON&key=${key}&sandbox=0`
      );
      //Recuperar array de provincias
      const provincias = await respuesta.json();
      //Devolver array de provincias
      const provinciasArray = provincias.data;

      return provinciasArray;
    } catch (error) {
      return [];
    }
  },
  recuperarMunicipios: async function (CPRO) {
    const key =
      "1f444ec01b55473e5dfba4cd58da5436cc2bd5070c109bd3315237974d9be46e";
    try {
      const respuesta = await fetch(
        `https://apiv1.geoapi.es/municipios?CPRO=${CPRO}&type=JSON&key=${key}&sandbox=0`
      );
      //Recuperar array de provincias
      const municipios = await respuesta.json();
      //Devolver array de provincias
      const municipiosArray = municipios.data;

      return municipiosArray;
    } catch (error) {
      return [];
    }
  },
};

export default pedidoRESTService;
