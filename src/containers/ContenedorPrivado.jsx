import { Link, Navigate, Outlet } from "react-router-dom";
import useAutenticacion from "../hooks/autenticacion-hook";
import Esperando from "../components/Esperando";

const ContenedorPrivado = () => {
  const {auth, cargando, cerrarSesion} = useAutenticacion();
  
  if (cargando) return (
    <Esperando />
  );
  if (!auth.data) return <Navigate to={'/login'} replace/>

  function CerrarSesion() {
    const confirmado = confirm('¿Desea cerrar sesión?');

    if (confirmado) {
      cerrarSesion();
    }
  }

  return (
    <div className="bg-yellow-600 min-h-screen flex flex-col flex-wrap font-spacemono">
      <div className="p-8 lg:flex justify-between items-center">
        <div className="font-bold text-4xl flex flex-col items-center justify-center">
          <Link to={'/'} className="hover:text-white">RadiussNet <span className="text-xl">Shop</span></Link>
          <button onClick={CerrarSesion} className="text-sm text-center hover:text-white">Cerrar Sesión</button>
        </div>
        <nav className="p-y-4 flex flex-col lg:flex-row lg:justify-center items-center mt-10 lg:mt-0 list-none gap-x-6 text-xl">
          <Link to={'/perfil'} className="hover:text-white font-semibold">Perfil</Link>
          <Link to={'/mis-compras'} className="hover:text-white font-semibold">Mis Compras</Link>
          <Link to={'/mis-contrataciones'} className="hover:text-white font-semibold">Mis Contrataciones</Link>
          <Link to={'/carrito'} className="hover:text-white font-semibold">Carrito</Link>
        </nav>
      </div>
      <Outlet />
    </div>
  );
};

export default ContenedorPrivado;
