let adminRESTService = {
  recuperarGeneros: async function () {
    try {
      let response = await fetch(
        "http://localhost:5000/Api/Admin/RecuperarGeneros",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en AdminRESTService.recuperarGeneros", error);
      return null;
    }
  },
  recuperarAlbumes: async function () {
    try {
      let response = await fetch(
        "http://localhost:5000/Api/Admin/RecuperarAlbumes",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en AdminRESTService.recuperarAlbumes", error);
      return null;
    }
  },
  agregarGenero: async function (datos) {
    try {
      let response = await fetch(
        "http://localhost:5000/Api/Admin/AgregarGenero",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en AdminRESTService.agregarGenero", error);
      return null;
    }
  },
  modificarGenero: async function (datos) {
    try {
      let response = await fetch(
        "http://localhost:5000/Api/Admin/ModificarGenero",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en AdminRESTService.modificarGenero", error);
      return null;
    }
  },
  eliminarGenero: async function (datos) {
    try {
      let response = await fetch(
        "http://localhost:5000/Api/Admin/EliminarGenero",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en AdminRESTService.eliminarGenero", error);
      return null;
    }
  },
  agregarAlbum: async function (formData) {
    try {
      console.log("Valor del formData...", formData);
      let response = await fetch(
        "http://localhost:5000/Api/Admin/AgregarAlbum",
        {
          method: "POST",
          body: formData,
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en AdminRESTService.agregarAlbum", error);
      return null;
    }
  },
  modificarAlbum: async function (formData) {
    try {
      let response = await fetch(
        "http://localhost:5000/Api/Admin/ModificarAlbum",
        {
          method: "POST",
          body: formData,
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en AdminRESTService.modificarAlbum", error);
      return null;
    }
  },
  eliminarAlbum: async function (datos) {
    try {
      let response = await fetch(
        "http://localhost:5000/Api/Admin/EliminarAlbum",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datos),
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log("Error en AdminRESTService.eliminarAlbum", error);
      return null;
    }
  },
};

export default adminRESTService;
