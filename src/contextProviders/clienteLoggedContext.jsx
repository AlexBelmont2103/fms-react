import { createContext, useContext, useReducer } from "react";

const clienteLoggedContext = createContext();

function clienteLoggedReducer(state, action) {
  switch (action.type) {
    case "CLIENTE_LOGIN":
    case "CLIENTE_UPDATE":
    case "CLIENTE_RECUPERAR":
      return {
        ...state,
        datoscliente: action.payload.datoscliente,
        tokensesion: action.payload.tokensesion,
      };
    case "CLIENTE_LOGOUT":
      return null;
    default:
      return state;
  }
}

//A EXPORTAR: componente con codigo jsx que defina el provider del contexto y pase valores del reducer
function ClienteLoggedProvider({ children }) {
  const [clienteLogged, dispatch] = useReducer(clienteLoggedReducer, null);
  return (
    <clienteLoggedContext.Provider value={{ clienteLogged, dispatch }}>
      {children}
    </clienteLoggedContext.Provider>
  );
}

//A EXPORTAR: Hook personalizado para usar los valores del contexto creado
function useClienteLoggedContext() {
  const value = useContext(clienteLoggedContext);
  return value;
}

export { ClienteLoggedProvider, useClienteLoggedContext };
