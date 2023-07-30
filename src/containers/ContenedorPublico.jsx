import { Navigate, Outlet } from "react-router-dom";

import useAutenticacion from "../hooks/autenticacion-hook";
import Esperando from "../components/Esperando";

const ContenedorPublico = () => {
  const { auth, cargando } = useAutenticacion();

  if (cargando) return <Esperando />;

  if (auth.data) return <Navigate to={"/"} replace />;

  return (
    <main className="min-h-screen bg-yellow-600 flex flex-col items-center justify-center font-spacemono">
    <h1 className="text-center text-4xl my-10 font-spacemono font-bold">RadiussNet <span className="text-lg">Shop</span></h1>
      <Outlet />
    </main>
  );
};

export default ContenedorPublico;
