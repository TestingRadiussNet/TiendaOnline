import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando";
import useCarrito from "../../hooks/carrito-hook";

const ProductoInfo = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { agregar } = useCarrito();
  const [cargando, setCargando] = useState(true);

  const [producto, setProducto] = useState();
  const [cantidad, setCantidad] = useState();

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      try {
        const respuesta = await axios.get(API_URL + "/tienda/producto/" + slug);

        setProducto(respuesta.data["data"]);
        setCantidad(respuesta.data["data"].disponible > 0 ? 1 : 0);
      } catch (error) {
        console.log(error);
        navigate("/");
      } finally {
        setCargando(false);
      }
    }
    fetchData();
  }, []);

  return (
    <main className="mx-auto bg-white p-8 rounded-xl shadow-xl mb-10">
      {cargando ? (
        <Esperando />
      ) : (
        <>
          <h1 className="text-center font-bold text-4xl">{producto.nombre}</h1>
          <p className="text-md font-normal text-gray-500">
            Categoría: <span>{producto.categoria.nombre}</span>
          </p>

          <img
            className="object-contain w-72 h-72 mx-auto"
            src={producto.imagenUrl}
            alt={producto.descripcion}
          />

          <p className="text-center text-xl font-semibold text-green-700">
            Precio:{" "}
            <span className="font-bold text-gray-500">
              ${producto.precioVenta} MXN
            </span>
          </p>
          <p className="mt-8 text-medium text-lg font-semibold text-gray-500">
            Descripción
          </p>
          <p>{producto.descripcion}</p>

          <p className="mt-8 text-medium text-lg font-semibold text-gray-500">
            Disponible:{" "}
            <span className="text-yellow-600">{producto.disponible}</span>
          </p>

          <div>
            <select
              value={cantidad}
              onChange={(ev) => {
                setCantidad(ev.target.value);
              }}
              name=""
              id=""
              className="block border-b-2 border-b-red-700 w-full my-4"
            >
              {generarOpcionesDisponibles(producto.disponible).map((e) => e)}
            </select>

            {producto.disponible > 0 ? (
              <div className="flex flex-col gap-y-4 mt-4">
                <button className="p-4 bg-blue-400 hover:bg-blue-500 text-white">
                  Comprar ahora
                </button>
                <button
                  onClick={() => {
                    agregar(producto, cantidad);
                  }}
                  className="p-4 bg-gray-400 hover:bg-gray-500 text-white"
                >
                  Agregar al carrito
                </button>
              </div>
            ) : (
              <></>
            )}
          </div>
        </>
      )}
    </main>
  );
};

function generarOpcionesDisponibles(cantidad) {
  const opciones = [];

  for (let i = 0; i < cantidad; i++) {
    opciones.push(
      <option key={i} value={i + 1}>
        {i + 1} unidades
      </option>
    );
  }

  return opciones;
}

export default ProductoInfo;
