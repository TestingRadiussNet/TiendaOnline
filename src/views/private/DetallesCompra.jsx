import React, { useEffect, useState } from "react";
import useCarrito from "../../hooks/carrito-hook";
import { API_URL } from "../../global/api";
import axios from "axios";
import Esperando from "../../components/Esperando";
import useAutenticacion from "../../hooks/autenticacion-hook";
import { useNavigate } from "react-router-dom";

const DetallesCompra = () => {
  const {
    auth: { data },
  } = useAutenticacion();
  const { carrito, limpiarRudo, calcularTotal } = useCarrito();

  const navigate = useNavigate();

  const [cargando, setCargando] = useState(true);
  const [listadoTarjetas, setListadoTarjetas] = useState([]);

  const [tarjeta, setTarjeta] = useState("");
  const [cvv, setCvv] = useState("");
  const [requiereInstalacion, setRequiereInstalacion] = useState(false);

  useEffect(() => {
    async function fetchTarjetas() {
      setCargando(true);
      try {
        const respuesta = await axios.get(
          API_URL + "/tarjetas/" + data._id + "/listado"
        );

        setListadoTarjetas(respuesta.data["data"]);
        setTarjeta(
          respuesta.data["data"].length > 0 ? respuesta.data["data"][0]._id : ""
        );
      } catch (error) {
        console.log(error);
        alert(error.response.data['msg']);
      } finally {
        setCargando(false);
      }
    }
    fetchTarjetas();
  }, []);

  async function comprar() {
    if (!tarjeta.length) {
      alert('Seleccione una tarjeta primero');
    } else if (!cvv.length) {
      alert('Digite el CVV');
    } else {
      try {
        const respuesta = await axios.post(API_URL + "/compras/"+data._id+'/nueva', {
          datosCompra: carrito,
          tarjeta,
          cvv,
          requiereInstalacion,
        });

        limpiarRudo();
        alert(respuesta.data['msg']);
        navigate('/mis-compras', {replace:true});
      } catch (error) {
        console.log(error);
        alert(error.response.data['msg']);
      }
    }
  }

  return (
    <main className="container mx-auto mb-10">
      <h1 className="text-4xl text-center font-bold">Detalles de la compra</h1>

      {cargando ? (
        <Esperando />
      ) : (
        <>
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
              </div>
            ))}
          </div>

          <p className="text-4xl text-center mt-10">
            Total: <span>${calcularTotal()} MXN</span>
          </p>

          <div className="my-8 mx-auto w-full flex justify-center gap-x-8">
            {listadoTarjetas.length == 0 ? (
              <p>No tiene tarjetas, añada una desde su perfil.</p>
            ) : (
              <>
                <select
                  value={tarjeta}
                  onChange={(ev) => setTarjeta(ev.target.value)}
                  className="p-2 border-b-2 border-b-red-700"
                >
                  {listadoTarjetas.map((e, i) => (
                    <option key={i} value={e._id}>
                      Tarjeta terminada en {e.numeroTarjeta.split(" ")[3]}
                    </option>
                  ))}
                </select>

                <input
                  type="password"
                  minLength={3}
                  maxLength={3}
                  value={cvv}
                  onChange={(ev) => setCvv(ev.target.value)}
                  className="p-2 border-b-2 border-b-red-700"
                  placeholder="CVV"
                />
              </>
            )}
          </div>

          <div className="mx-auto w-full flex justify-center gap-x-4">
            <input
              type="checkbox"
              checked={requiereInstalacion}
              onChange={(ev) => setRequiereInstalacion(ev.target.checked)}
            />
            <span>Requiere Instalación</span>
          </div>

          <div className="mt-10 mx-auto flex justify-center gap-6">
            <button
              onClick={() => {
                comprar();
              }}
              className="p-4 bg-green-600 hover:bg-green-700 text-white"
            >
              Terminar compra
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default DetallesCompra;
