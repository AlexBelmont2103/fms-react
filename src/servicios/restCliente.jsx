let clienteRESTService = {
  registro: async function (datosCliente) {
    const formData = new FormData();
    for (const key in datosCliente) {
      formData.append(key, datosCliente[key]);
    }
    console.log("Valor del formData...", formData);
    try {
      let response = await fetch("http://localhost:5000/api/Cliente/Registro", {
        method: "POST",
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.log("Error al intentar registrar cliente...", error);
    }
  },
  comprobarEmail: async function (email) {
    try {
      let response = await fetch(
        "http://localhost:5000/api/Cliente/ComprobarEmail",
        {
          method: "POST",
          body: JSON.stringify({ email: email }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error al intentar comprobar email...", error);
    }
  },
  comprobarLogin: async function (login) {
    try {
      let response = await fetch(
        "http://localhost:5000/api/Cliente/ComprobarLogin",
        {
          method: "POST",
          body: JSON.stringify({ login: login }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error al intentar comprobar login...", error);
    }
  },
  login: async function (credenciales) {
    try {
      let response = await fetch("http://localhost:5000/api/Cliente/Login", {
        method: "POST",
        body: JSON.stringify(credenciales),
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    } catch (error) {
      console.log("Error al intentar loguear cliente...", error);
    }
  },
  recuperarCliente: async function (id) {
    try {
      let response = await fetch(
        "http://localhost:5000/api/Cliente/RecuperarCliente/" + id
      );
      console.log("Valor de response...", response);
      return response.json();
    } catch (error) {
      console.log("Error al intentar recuperar cliente...", error);
    }
  },
  cambiarImagenAvatar: async function (formData, tokensesion) {
    console.log("Valor del formData...", formData);
    try {
      let response = await fetch(
        "http://localhost:5000/api/Cliente/ActualizarAvatar/",
        {
          method: "POST",
          body: formData,
          headers: {
            authorization: "Bearer " + tokensesion,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error al intentar cambiar imagen avatar...", error);
    }
  },
  actualizarDatosCliente: async function (values, tokensesion) {
    try {
      console.log("Valor de datosCliente...", values);
      let response = await fetch(
        "http://localhost:5000/api/Cliente/ActualizarDatosCliente",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + tokensesion,
          },
        }
      );
      return await response.json();
    } catch (error) {
      console.log("Error al intentar actualizar datos cliente...", error);
    }
  },
};

export default clienteRESTService;
