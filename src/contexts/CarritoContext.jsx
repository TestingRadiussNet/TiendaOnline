import { createContext, useEffect, useState } from "react"

const CarritoContextDefault = [];

const CarritoContext = createContext(CarritoContextDefault);

const CARRITO_LOCAL_STORAGE_KEY = "radiuss-net-carrito";

const cargarCarritoLocalStorage = () => {
  const carritoJSON = localStorage.getItem(CARRITO_LOCAL_STORAGE_KEY);
  console.log(carritoJSON);

  if (!carritoJSON) return [];

  const data = JSON.parse(carritoJSON);

  return data;
}

const guardarCarritoLocalStorage = (data) => {
  console.log(data);
  localStorage.setItem(CARRITO_LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export const CarritoProvider = ({children}) => {
    const [carrito, setCarrito] = useState(CarritoContextDefault);

    useEffect(() => {
      function cargarCarrito() {
        const data = cargarCarritoLocalStorage();
        setCarrito(data);
      }
      cargarCarrito();
    }, []);

    const agregar = (producto, cantidad) => {
      const productoIndex = carrito.findIndex(e => e.producto._id === producto._id);
      if (productoIndex != -1) {
        const elemento = carrito[productoIndex];
        const nProductos = Number(elemento.cantidad) + (Number(cantidad));
        if (nProductos > elemento.producto.disponible) {
          alert('No puedes agregar más productos del disponible');
        } else {
          const listadoNuevo = carrito.map((e, index) => {
            if (index === productoIndex) {
              return {
                producto,
                cantidad: nProductos
              }
            } else {
              return e
            }
          });
          setCarrito(listadoNuevo);
          guardarCarritoLocalStorage(listadoNuevo);
          alert('Carrito actualizado');
        }

      } else {
        const listadoNuevo = [{
          producto,
          cantidad
        }, ...carrito];
        setCarrito(listadoNuevo);
        guardarCarritoLocalStorage(listadoNuevo);
        alert('Producto agregado');
      }
    }

    const remover = (elemento) => {
      const productoIndex = carrito.findIndex(e => e.producto._id == elemento.producto._id);
      const listadoNuevo = carrito.filter((e, i) => i !== productoIndex);

      setCarrito(listadoNuevo);
      guardarCarritoLocalStorage(listadoNuevo);
      alert('Producto removido');
    }

    const limpiar  = () => {
      const confirmado = confirm('Desea limpiar el carrito?');

      if (!confirmado) return;

      if (carrito.length) {
        setCarrito([]);
        guardarCarritoLocalStorage([]);
        alert('Carrito limpiado');
      } else {
        alert('No hay nada que limpiar');
      }
    }

    const limpiarRudo = () => {
      setCarrito([]);
      guardarCarritoLocalStorage([]);
    }

    const calcularTotal = () => {
      let total = 0;

      carrito.forEach(e => {
        const importe = e.producto.precioVenta * e.cantidad;
        total += importe;
      });

      return total;
    }

  return (
    <CarritoContext.Provider value={{carrito, agregar, remover, limpiar, limpiarRudo, calcularTotal}}>
        {children}
    </CarritoContext.Provider>
  )
}

export default CarritoContext;