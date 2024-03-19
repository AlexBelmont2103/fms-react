import { createContext, useContext, useReducer } from "react";

const itemsCarroContext = createContext();

function itemsCarroReducer(state, action) {
  console.log(action);
  console.log(state);
}

//A EXPORTAR: componente con codigo jsx que defina el provider del contexto y pase valores del reducer
function ItemsCarroProvider({ children }) {
  const [itemsCarro, dispatch] = useReducer(itemsCarroReducer, []);
  return (
    <itemsCarroContext.Provider value={{ itemsCarro, dispatch }}>
      {children}
    </itemsCarroContext.Provider>
  );
}

//A EXPORTAR: Hook personalizado para usar los valores del contexto creado
function useItemsCarroContext() {
  const value = useContext(itemsCarroContext);
  return value;
}

export { ItemsCarroProvider, useItemsCarroContext };
