import React from "react";

import useCarrito from "../../hooks/carrito-hook";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const { carrito, total, remover, limpiar } = useCarrito();

  const navigate = useNavigate();

  return (
    <main className="container mx-auto">
      <h1 className="text-center font-bold text-4xl">Mi carrito</h1>

      {!carrito.length ? (
        <p className="text-xl text-center">
          No tienes productos en tu carrito.
        </p>
      ) : (
        <div className="mt-10 grid lg:grid-cols-2 gap-4">
          {carrito.map((e, i) => (
            <div
              key={i}
              className="p-4 bg-white flex gap-4 items-center justify-evenly"
            >
              <div>
                <img
                  src={e.producto.imagenUrl}
                  alt={e.producto.descripcion}
                  className="object-contain w-full h-32"
                />
              </div>
              <div>
                <p className="font-bold">{e.producto.nombre}</p>
                <p>
                  Precio unitario: <span>${e.producto.precioVenta}</span>
                </p>
                <p>
                  Cantidad: <span>{e.cantidad}</span>
                </p>
                <p>
                  Importe: <span>${e.cantidad * e.producto.precioVenta}</span>
                </p>
              </div>
              <div>
                <button
                  onClick={() => {
                    remover(e);
                  }}
                  className="bg-red-600 text-white p-4"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-10 mx-auto flex justify-center gap-6">
        <button onClick={() => limpiar()} className="p-4 bg-amber-800 text-white">Limpiar Carrito</button>
        <button onClick={() => {
          if (carrito.length === 0) {
            alert('No hay nada que comprar!')
          } else {
            navigate('/detalles-compra', {replace: true});
          }
        }} className="p-4 bg-blue-400 hover:bg-blue-500 text-white">
          Terminar compra
        </button>
      </div>
    </main>
  );
};

export default Carrito;
