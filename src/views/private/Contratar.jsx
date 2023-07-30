import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import useAuth from "../../hooks/autenticacion-hook";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando";

const Contratar = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const {
    auth: { data },
  } = useAuth();

  const [cargando, setCargando] = useState(false);

  const [listadoTarjetas, setListadoTarjetas] = useState([]);

  const [servicio, setServicio] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [cvv, setCvv] = useState("");
  const [meses, setMeses] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const respuesta = await axios.get(API_URL + "/tienda/servicio/" + id);

        setServicio(respuesta.data["data"]);
      } catch (error) {
        console.log(error);
      }
    }
    async function fetchTarjetas() {
      try {
        const respuesta = await axios.get(
          API_URL + "/tarjetas/" + data._id + "/listado"
        );

        setListadoTarjetas(respuesta.data["data"]);
        setTarjeta(respuesta.data['data'].length > 0 ? respuesta.data['data'][0]._id : "")
      } catch (error) {
        console.log(error);
      }
    }

    async function start() {
      setCargando(true);
      try {
        await Promise.all([fetchData(), fetchTarjetas()]);
      } catch (error) {
        console.log(error);
        navigate("/");
      } finally {
        setCargando(false);
      }
    }

    start();
  }, []);

  async function contratar() {
    console.log(tarjeta);
    if (meses < 0) {
        alert('Elija un número de meses superior a 0');
    } else if (!tarjeta.length) {
        alert('Elija una tarjeta primero');
    } else if (cvv.length !== 3) {
        alert('Coloque su CVV');
    } else {
        const confirmado = confirm("Desea realizar la contratación");
    }
  }

  return (
    <main className="container mx-auto">
      {cargando ? (
        <Esperando />
      ) : (
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h1 className="text-4xl text-center font-bold">{servicio.nombre}</h1>

          <div className="mt-10 flex flex-col lg:flex-row gap-8 items-center justify-evenly">
          <div className="lg:w-1/3">
          <p className="text-lg">
            GBs: <span className="text-green-700 font-bold">{servicio.gb}</span>
          </p>
          <p className="text-lg">
            Velocidad: <span className="text-green-700 font-bold">{servicio.velocidadDescargaMbps} Mbps</span>
          </p>
          <p className="text-lg">
            Dispositivos: <span className="text-green-700 font-bold">{servicio.dispositivosSimultaneos}</span>
          </p>
          <p className="text-lg">
            Precio mensual: <span className="text-green-700 font-bold">${servicio.precioMensual} MXN</span>
          </p>
          </div>
          <div className="lg:w-1/3 flex gap-x-4">
            {
                listadoTarjetas.length == 0 ? <p>No tiene tarjetas, añada una desde su perfil.</p>
                :
                    <>
                    <select value={tarjeta} onChange={(ev) => setTarjeta(ev.target.value)} className="p-2 border-b-2 border-b-red-700">
                        {
                            listadoTarjetas.map((e, i) => (
                                <option key={i} value={e._id}>Tarjeta terminada en {e.numeroTarjeta}</option>
                            ))
                        }
                    </select>

                    <input type="password" minLength={3} maxLength={3} value={cvv} onChange={(ev) => setCvv(ev.target.value)} className="p-2 border-b-2 border-b-red-700" placeholder="CVV"/>
                    </>
            }
          </div>
          <div className="flex flex-col gap-8 lg:w-1/3">
            <div>
            <label htmlFor="" className="text-lg">Meses</label>
            <select value={meses} onChange={(ev) => setMeses(ev.target.value)} name="" id="" className="block w-full p-2 border-b-2 border-b-red-700">
                <option value={1}>1 mes</option>
                <option value={3}>3 meses</option>
                <option value={6}>6 meses</option>
                <option value={12}>12 meses</option>
            </select>
            </div>
            <button onClick={contratar} className="p-4 text-white bg-blue-400 hover:bg-blue-500">Contratar</button>
          </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Contratar;
