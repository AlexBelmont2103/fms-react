import { useParams } from "react-router-dom";

function RegistroOk() {
  const { email } = useParams();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 bg-white rounded shadow-md w-80">
          <h1 className="text-2xl font-bold mb-4 text-gray-700">
            Registro completado con éxito
          </h1>
          <p className="text-gray-600">
            Gracias por registrarte en FullMetal Store. Te hemos enviado un
            email a {email} con un enlace para activar tu cuenta.
          </p>
        </div>
      </div>
    </>
  );
}
export default RegistroOk;
