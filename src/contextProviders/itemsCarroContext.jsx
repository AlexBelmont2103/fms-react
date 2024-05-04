import { createContext, useContext, useReducer } from "react";

const itemsCarroContext = createContext();

function itemsCarroReducer(state, action) {
  let carrito = [...state];
  let itemEncontrado;
  console.log(action);
  console.log(state);
  switch (action.type) {
    case "ADD_NUEVO_ALBUM":
      itemEncontrado = carrito.find(
        (item) => item.album._id === action.payload.album._id
      );
      console.log("Item encontrado", itemEncontrado);
      if (itemEncontrado) {
        let nuevaCantidad = itemEncontrado.cantidad;
        console.log(nuevaCantidad);
        itemEncontrado.cantidad = nuevaCantidad + 0.5;
      } else {
        carrito.push({ album: action.payload.album, cantidad: 1 });
      }
      console.log("Carrito", carrito);
      return carrito;
    case "RESTAR_CANTIDAD_ALBUM":
      itemEncontrado = carrito.find(
        (item) => item.album._id === action.payload._id
      );

      if (itemEncontrado && itemEncontrado.cantidad > 1) {
        itemEncontrado.cantidad= itemEncontrado.cantidad - 0.5;
      } else {
        carrito = carrito.filter((album) => album._id !== action.payload._id);
      }

      return carrito;
    case "ELIMINAR_ALBUM":
      carrito = carrito.filter((item) => item.album._id !== action.payload._id);
      console.log("Carrito", carrito);
      return carrito;
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
