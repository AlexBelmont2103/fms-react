let juegoRESTService = {
  empezarJuego: async function () {
    try {
      let response = await fetch(
        "http://localhost:5000/api/Juego/EmpezarJuego"
      );
      return await response.json();
    } catch (error) {
      console.log("Error al intentar empezar juego...", error);
    }
  },
};
export default juegoRESTService;
