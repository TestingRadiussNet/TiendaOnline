import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../../global/api";
import Esperando from "../../components/Esperando";

const NuevaContrasena = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [cargando, setCargando] = useState(true);
  const [valido, setValido] = useState(false);

  const [contrasena, setContrasena] = useState("");
  const [repetirContrasena, setRepetirContrasena] = useState("");

  useEffect(() => {
    async function fetchData() {
      setCargando(true);
      try {
        const respuesta = await axios.get(
          API_URL + "/autenticacion/recuperar/" + token
        );

        setValido(true);
      } catch (error) {
        navigate("/login", { replace: true });
      } finally {
        setCargando(false);
      }
    }
    fetchData();
  }, []);

  async function submit(ev) {
    ev.preventDefault();

    if (!repetirContrasena.length || !contrasena.length) {
      alert("Hay campos vacíos");
      return;
    } else if (contrasena != repetirContrasena) {
        alert("Las contraseñas no coinciden");
        return;
    }

    try {
      const respuesta = await axios.post(API_URL + "/autenticacion/nueva-contrasena/"+token, {
        contrasena,
      });

      alert(respuesta.data["msg"]);

      navigate("/", { replace: true });
    } catch (error) {
        console.log(error);
      alert(error.response.data["msg"]);
    }
  }

  return (
    <>
      {cargando ? (
        <Esperando />
      ) : !valido ? (
        <></>
      ) : (
        <form
          onSubmit={submit}
          className="bg-white p-4 rounded-xl w-4/5 shadow-xl lg:w-1/4"
        >
          <legend className="my-4 text-2xl font-bold text-center">
            Nueva contraseña
          </legend>

          <div className="my-2">
            <div className="flex justify-between">
              <i className="fa-solid fa-lock text-red-700 text-xl"></i>
              <label htmlFor="" className="font-bold">
                Contraseña
              </label>
            </div>
            <input
              value={contrasena}
              onInput={(ev) => setContrasena(ev.target.value)}
              type="password"
              placeholder="Su contraseña"
              className="p-2 bg-gray-200 border-b-2 border-b-red-700 w-full"
            />
          </div>

          <div className="my-2">
            <div className="flex justify-between">
              <i className="fa-solid fa-lock text-red-700 text-xl"></i>
              <label htmlFor="" className="font-bold">
                Repetir Contraseña
              </label>
            </div>
            <input
              value={repetirContrasena}
              onInput={(ev) => setRepetirContrasena(ev.target.value)}
              type="password"
              placeholder="Repetir contraseña"
              className="p-2 bg-gray-200 border-b-2 border-b-red-700 w-full"
            />
          </div>

          <button
            type="submit"
            className="p-4 bg-blue-400 hover:bg-blue-500 text-white block w-full"
          >
            Establecer
          </button>
        </form>
      )}
    </>
  );
};

export default NuevaContrasena;
