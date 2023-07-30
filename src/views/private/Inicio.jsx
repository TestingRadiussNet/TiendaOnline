import React, { useEffect, useState } from "react";
import axios from "axios";

import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando";
import { Link } from "react-router-dom";
const Inicio = () => {
  const [cargando, setCargando] = useState(false);

  const [listadoProductos, setListadoProductos] = useState([]);
  const [listadoServicios, setListadoServicios] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      try {
        await Promise.all([fetchProductos(), fetchServicios()]);
      } catch (error) {
        alert("Hubo un error al llamar al servidor");
      } finally {
        setCargando(false);
      }
    }
    fetchData();
  }, []);

  async function fetchProductos() {
    try {
      const respuesta = await axios.get(API_URL + "/tienda/productos");

      setListadoProductos(respuesta.data["data"]);
    } catch (e) {
      console.log(e);
      alert(e.response.data["msg"]);
    }
  }

  async function fetchServicios() {
    try {
      const respuesta = await axios.get(API_URL + "/tienda/servicios");

      setListadoServicios(respuesta.data["data"]);
    } catch (e) {
      console.log(e);
      alert(e.response.data["msg"]);
    }
  }

  return (
    <main>
      <h1 className="text-4xl text-center font-bold">Inicio</h1>

      {cargando ? (
        <Esperando />
      ) : (
        <>
          <section className="my-10">
            <h2 className="text-2xl text-center font-bold">Productos</h2>

            {listadoProductos.length === 0 ? (
              <p className="text-xl text-center font-bold">Sin productos.</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-8 container mx-auto mt-10">
                {listadoProductos.map((producto, index) => (
                  <div key={index} className="p-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden">
                    {
                      producto.disponible === 0 ? <p className="text-red-500 font-bold my-2 text-center">Agotado!</p> : <></>
                    }
                    <img
                      className="w-full mx-auto h-32 object-cover object-center hover:scale-105 transition-transform duration-300"
                      src={producto.imagenUrl}
                      alt={producto.descripcion}
                    />
                    <div className="px-4 py-4">
                      <h2 className="text-gray-800 font-semibold text-lg mb-2">
                        {producto.nombre}
                      </h2>
                      <p className="text-gray-600 break-words">
                        {producto.descripcion.substring(0, 40)}...
                      </p>
                      <div className="flex items-center mt-4">
                        <span className="text-green-600 font-semibold text-sm mr-2">
                          Precio
                        </span>
                        <span className="text-gray-600 font-semibold text-sm">
                          {producto.precioVenta} MXN
                        </span>
                      </div>
                    </div>

                    <Link to={'/producto/'+producto.slug} className="p-2 text-white bg-yellow-600 hover:bg-yellow-700 block w-full text-center">Ver</Link>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="my-10">
            <h2 className="text-2xl text-center font-bold">Servicios</h2>

            {listadoServicios.length === 0 ? (
              <p className="text-xl text-center font-bold">Sin servicios.</p>
            ) : (
              <div className="flex flex-wrap gap-8 justify-center container mx-auto mt-10">
                {
                  listadoServicios.map((e, i) => (
                    <div className="bg-white rounded-xl shadow-lg p-4" key={i}>
                      <p className="text-gray-800 font-semibold text-lg mb-2">{e.nombre}</p>

                      <p>GBs: <span>{e.gb}</span></p>
                      <p>Velocidad: <span>{e.velocidadDescargaMbps} Mbps</span></p>
                      <p>Dispositivos: <span>{e.dispositivosSimultaneos}</span></p>
                      <p>Precio mensual: <span>${e.precioMensual} MXN</span></p>

                      <Link to={'/contratar/'+e._id} className="block text-center p-4 bg-blue-400 hover:bg-blue-500 w-full mt-4 text-white">Contratar</Link>
                    </div>
                  ))
                }
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default Inicio;
