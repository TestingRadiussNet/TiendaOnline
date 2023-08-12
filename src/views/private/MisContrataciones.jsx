import React, { useEffect, useState } from "react";
import Esperando from "../../components/Esperando";

import { formatearFecha } from "../../utils/formatos.js";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import useAutenticacion from "../../hooks/autenticacion-hook";
import { API_URL } from "../../global/api";

const MisContrataciones = () => {
  const {
    auth: { data },
  } = useAutenticacion();
  const [cargando, setCargando] = useState(true);

  const [contrataciones, setContrataciones] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      try {
        const response = await axios.get(
          API_URL + "/contrataciones/listado/" + data._id
        );

        setContrataciones(response.data["data"]);
      } catch (e) {
        console.log(e);
        alert("Hubo un error");
      } finally {
        setCargando(false);
      }
    }

    fetchData();
  }, []);

  return (
    <main className="container mx-auto">
      <h1 className="text-4xl text-center font-bold">Mis Contrataciones</h1>

      {cargando ? (
        <Esperando />
      ) : (
        <>
          {contrataciones.length === 0 ? (
            <p className="text-xl text-center font-bold">Sin contrataciones hechas.</p>
          ) : (
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-lg">
              {contrataciones.map((e, i) => (
                <div key={i} className="p-4 rounded-lg bg-white">
                  <p>
                    ID:{" "}
                    <span className="text-yellow-600 font-bold">{e._id}</span>
                  </p>
                  <p>
                    Fecha: <span>{formatearFecha(e.fecha)} hrs</span>
                  </p>
                  <p>
                    Servicio:{" "}
                    <span className="text-blue-700 font-bold">
                      {e.servicio.nombre}
                    </span>
                  </p>
                  <p>
                    Precio mensual:{" "}
                    $<span className="text-green-600">{e.precioMensual}</span>
                  </p>
                  <p>
                    Meses contratados:{" "}
                    <span className="">{e.mesesContratados}</span>
                  </p>
                  <p>
                    Total: $
                    <span className="text-green-700 font-bold">{e.total}</span>
                  </p>
                  <p>
                    Estado:{" "}
                    <span>
                      {e.instalacionPendiente
                        ? "Instalación pendiente"
                        : "Instalación programada"}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default MisContrataciones;
