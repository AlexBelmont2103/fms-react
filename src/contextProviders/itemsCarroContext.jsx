import { createContext, useContext, useReducer } from "react";

const itemsCarroContext = createContext();

function itemsCarroReducer(state, action) {
  switch (action.type) {
    case "ADD_NUEVO_ALBUM":
      return [...state, action.payload];
    case "ADD_CANTIDAD_ALBUM":
      return state.map((album) =>
        album._id === action.payload._id
          ? { ...album, cantidad: album.cantidad + 1 }
          : album
      );
    case "RESTAR_CANTIDAD_ALBUM":
      return state.map((album) =>
        album._id === action.payload._id
          ? { ...album, cantidad: album.cantidad - 1 }
          : album
      );
    case "ELIMINAR_ALBUM":
      return state.filter((album) => album._id !== action.payload._id);
    case "VACIAR_CARRITO":
      return [];
    default:
      return state;
  }
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
