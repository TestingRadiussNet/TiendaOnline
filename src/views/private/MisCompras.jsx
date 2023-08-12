import React, { useEffect, useState } from 'react'
import Esperando from '../../components/Esperando';

import { formatearFecha } from "../../utils/formatos.js";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

import useAutenticacion from "../../hooks/autenticacion-hook";
import { API_URL } from "../../global/api";

const MisCompras = () => {
  const {
    auth: { data },
  } = useAutenticacion();
  const [cargando, setCargando] = useState(true);

  const [compras, setCompras] = useState([]);

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      try {
        const response = await axios.get(API_URL + "/compras/"+data._id);
        
        setCompras(response.data["data"]);
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
    <main className='container mx-auto'>
      <h1 className="text-4xl text-center font-bold">Mis Compras</h1>

      {
        cargando ? <Esperando /> :
        <>
          {
            compras.length === 0 ? <p className="text-xl text-center font-bold">Sin compras hechas.</p> :
            <div className="mt-10 grid grid-cols-2 gap-4 rounded-lg">
              {
                compras.map((e, i) => (
                  <div key={i} className="p-4 rounded-lg bg-white">
                    <p>ID: <span className="text-yellow-600 font-bold">{e._id}</span></p>
                    <p>Fecha: <span>{formatearFecha(e.fecha)} hrs</span></p>
                    <p>Total: $<span className="text-green-700 font-bold">{e.total}</span></p>

                    <Link to={'/mis-compras/'+e._id} className="p-2 text-white bg-yellow-600 hover:bg-yellow-700 block w-full text-center">Ver</Link>

                  </div>
                ))
              }
            </div>
          }
        </>
      }
    </main>
  )
}

export default MisCompras