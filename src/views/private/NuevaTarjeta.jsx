import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import useAutenticacion from "../../hooks/autenticacion-hook";
import axios from "axios";
import { API_URL } from "../../global/api";

const NuevaTarjeta = () => {

    const {auth: {data}} = useAutenticacion();
    const navigate = useNavigate();

  const [propietario, setPropietario] = useState("");
  const [numeroTarjeta, setNumeroTarjeta] = useState("");
  const [mesExpiracion, setMesExpiracion] = useState("01");
  const [anioExpiracion, setAnioExpiracion] = useState(
    (new Date().getFullYear() + 1).toString().substring(2)
  );
  const [cvv, setCvv] = useState("");

  const formatNumeroTarjeta = (ev) => {
    const unformattedValue = ev.target.value.replace(/\s/g, '');
    const formattedValue = unformattedValue.toString().replace(/(.{4})/g, '$1 ');
    setNumeroTarjeta(formattedValue.substr(0, 19));
  };

  async function Submit(ev) {
    ev.preventDefault();

    if (!propietario.length) {
        alert('Falta el propietario');
    } else if (!numeroTarjeta.length === 20) {
        alert('Numero de tarjeta inválido');
    } else if (mesExpiracion.length != 2) {
        alert('Mes de expiración inválido');
    } else if (anioExpiracion.length != 2) {
        alert('Año de expiración inválido');
    } else if (cvv.length !== 3) {
        alert('CVV inválido');
    } else {
        try {
            const respuesta = await axios.post(API_URL +"/tarjetas/"+data._id+"/nueva", {
                propietario,
                numeroTarjeta,
                mesExpiracion,
                anioExpiracion,
                cvv
            });

            alert(respuesta.data['msg']);
            navigate('/perfil');
        } catch (error) {
            console.log(error);
            alert(error.response.data['msg']);
        }
    }
  }

  return (
    <main className="container mx-auto">
      <h1 className="text-center font-bold text-4xl">Mi Perfil</h1>

      <Link
        to={"/perfil"}
        className="p-4 w-64 block mx-auto mt-10 bg-amber-800 hover:bg-amber-900 text-white text-center"
      >
        Regresar
      </Link>

      <form onSubmit={Submit} className="mt-10 mb-20 bg-white flex flex-col gap-6 p-4 rounded-xl shadow-xl w-5/6 lg:w-1/2 mx-auto">
        <div>
          <label>Nombre del propietario</label>
          <input
            value={propietario}
            onChange={(ev) => setPropietario(ev.target.value)}
            type="text"
            placeholder="Nombre del propietario"
            className="w-full p-2 border-b-2 border-b-red-700"
          />
        </div>
        <div>
          <label>Número de tarjeta</label>
          <input
            value={numeroTarjeta}
            onChange={formatNumeroTarjeta}
            type="tel"
            maxLength={20}
            placeholder="Número de tarjeta"
            className="w-full p-2 border-b-2 border-b-red-700"
          />
        </div>
        <div className="flex items-center justify-center gap-y-8">
          <div>
            <label>Fecha de expiración</label>
            <div className="flex">
              <input
                value={mesExpiracion}
                onChange={(ev) => setMesExpiracion(ev.target.value)}
                type="text"
                className="w-12 p-2 text-center border border-gray-300 rounded-l-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                placeholder="MM"
                maxLength="2"
              />
              <span className="mx-2 font-bold">/</span>
              <input
                value={anioExpiracion}
                onChange={(ev) => setAnioExpiracion(ev.target.value)}
                type="text"
                className="w-20 p-2 text-center border border-gray-300 rounded-r-md focus:ring focus:ring-blue-200 focus:border-blue-500"
                placeholder="YY"
                maxLength="2"
              />
            </div>
          </div>
          <div>
            <label>CVV</label>
            <input
              value={cvv}
              onChange={(ev) => setCvv(ev.target.value)}
              type="password"
              maxLength={3}
              placeholder="CVV"
              className="w-full p-2 border-b-2 border-b-red-700"
            />
          </div>
        </div>

        <button type="submit" className="p-4 text-white mx-auto block mt-10 bg-blue-400 hover:bg-blue-500">Agregar</button>
      </form>
    </main>
  );
};

export default NuevaTarjeta;
