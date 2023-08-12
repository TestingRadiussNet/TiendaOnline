import React, { useEffect, useState } from "react";

import Esperando from "../../components/Esperando";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import useAutenticacion from "../../hooks/autenticacion-hook";
import { API_URL } from "../../global/api";

import { LOCAL_STORAGE_KEY } from "../../contexts/AutenticacionContext";

const Perfil = () => {
  const navigate = useNavigate();

  const {
    auth: { data },
  } = useAutenticacion();

  const [cargando, setCargando] = useState(true);

  const [usuario, setUsuario] = useState(data);
  const [listadoTarjetas, setListadoTarjetas] = useState([]);

  useEffect(() => {
    fetchTarjetas();
  }, []);

  async function fetchTarjetas() {
    setCargando(true);
    try {
      const respuesta = await axios.get(
        API_URL + "/tarjetas/" + data._id + "/listado"
      );
      setListadoTarjetas(respuesta.data["data"]);
    } catch (error) {
      console.log(error);
    } finally {
      setCargando(false);
    }
  }

  async function editarDatos(ev) {
    ev.preventDefault();
    const jwt = localStorage.getItem(LOCAL_STORAGE_KEY);
    setCargando(true);
    try {
      const respuesta = await axios.patch(
        API_URL + "/autenticacion/actualizar-datos",
        {
          ...usuario,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        }
      );

      alert(respuesta.data['msg']);
    } catch (error) {
      alert(error.response.data);
    } finally {
      setCargando(false);
    }
  }

  return (
    cargando ? <Esperando />
    :
    <main className="container mx-auto">
      <h1 className="text-center font-bold text-4xl">Mi Perfil</h1>

      <form
        onSubmit={editarDatos}
        className="flex flex-col mt-20 w-5/6 md:w-1/2 gap-4 mx-auto"
      >
        <div className="w-full">
          <label htmlFor="" className="block">
            Nombre
          </label>
          <input
            value={usuario.nombre}
            onChange={(ev) => {
              setUsuario((user) => ({
                ...user,
                nombre: ev.target.value,
              }));
            }}
            type="text"
            placeholder="Nombre"
            className="w-full p-2 border-b-2 border-b-red-700"
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Apellido paterno
          </label>
          <input
            value={usuario.paterno}
            onChange={(ev) => {
              setUsuario((user) => ({
                ...user,
                paterno: ev.target.value,
              }));
            }}
            type="text"
            placeholder="Apellido paterno"
            className="w-full p-2 border-b-2 border-b-red-700"
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Apellido materno
          </label>
          <input
            value={usuario.materno}
            onChange={(ev) => {
              setUsuario((user) => ({
                ...user,
                materno: ev.target.value,
              }));
            }}
            type="text"
            placeholder="Apellido materno"
            className="w-full p-2 border-b-2 border-b-red-700"
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Correo
          </label>
          <input
            value={usuario.correo}
            onChange={(ev) => {
              setUsuario((user) => ({
                ...user,
                correo: ev.target.value,
              }));
            }}
            type="email"
            placeholder="Correo"
            className="w-full p-2 border-b-2 border-b-red-700"
          />
        </div>
        <div>
          <label htmlFor="" className="block">
            Teléfono
          </label>
          <input
            value={usuario.telefono}
            onChange={(ev) => {
              setUsuario((user) => ({
                ...user,
                telefono: ev.target.value,
              }));
            }}
            type="tel"
            maxLength={10}
            placeholder="Teléfono"
            className="w-full p-2 border-b-2 border-b-red-700"
          />
        </div>

        <button
          type="submit"
          className="text-white p-4 text-center mx-auto bg-blue-400 hover:bg-blue-500"
        >
          Actualizar
        </button>
      </form>

      <section className="mt-20">
        <h2 className="text-center font-bold text-4xl">Mis tarjetas</h2>
        <button
          onClick={() => {
            navigate("/nueva-tarjeta", { replace: true });
          }}
          className="my-10 p-4 bg-green-600 hover:bg-green-700 text-white mx-auto block"
        >
          Nueva
        </button>
        {listadoTarjetas.length == 0 ? (
          <p className="text-center text-xl mb-10">
            No tiene tarjetas, añada una.
          </p>
        ) : (
          <div className="mb-10 flex flex-col gap-y-4">
            {listadoTarjetas.map((e, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg p-2 flex gap-2 justify-between">
                <p>
                  Tarjeta terminada en{" "}
                  <span className="font-bold">
                    {e.numeroTarjeta.split(" ")[3]}
                  </span>
                </p>
                <button onClick={async () => {
                  const confirmado = confirm('¿Eliminar tarjeta?');
                  if (confirmado) {
                    setCargando(true);
                    try {
                      const respuesta = await axios.delete(API_URL+"/tarjetas/eliminar/"+e._id);

                      alert(respuesta.data['msg']);
                      fetchTarjetas();
                    } catch (error) {
                      alert('Hubo un error');
                    } finally {
                      setCargando(false);
                    }
                  }
                }} className="p-1 bg-red-600 text-white text-center rounded-xl">Eliminar</button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Perfil;
