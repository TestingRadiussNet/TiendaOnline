import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { AutenticacionProvider } from "./contexts/AutenticacionContext";
import { CarritoProvider } from "./contexts/CarritoContext";
import { DetallesCompraProvider } from "./contexts/DetallesCompraContext";

import ContenedorPublico from "./containers/ContenedorPublico";
import ContenedorPrivado from "./containers/ContenedorPrivado";

import Login from "./views/public/Login";
import CrearCuenta from "./views/public/CrearCuenta";
import Recuperar from "./views/public/Recuperar";

import Inicio from "./views/private/Inicio";
import ProductoInfo from "./views/private/ProductoInfo";
import Carrito from "./views/private/Carrito";
import Contratar from "./views/private/Contratar";
import Perfil from "./views/private/Perfil";
import NuevaTarjeta from "./views/private/NuevaTarjeta";
import DetallesCompra from "./views/private/DetallesCompra";
import MisCompras from "./views/private/MisCompras";

const App = () => {
  return (
    <Router>
      <AutenticacionProvider>
        <CarritoProvider>
          <DetallesCompraProvider>
            <Routes>
              <Route element={<ContenedorPublico />}>
                <Route index path="/login" Component={Login} />
                <Route path="/crear-cuenta" Component={CrearCuenta} />
                <Route path="/recuperar" Component={Recuperar} />
              </Route>

              <Route path="/" element={<ContenedorPrivado />}>
                <Route index Component={Inicio} />
                <Route path="/perfil" Component={Perfil}/>
                <Route path="/nueva-tarjeta" Component={NuevaTarjeta}/>
                <Route path="/producto/:slug" Component={ProductoInfo} />
                <Route path="/carrito" Component={Carrito} />
                <Route path="/contratar/:id" Component={Contratar}/>
                <Route path="/detalles-compra" Component={DetallesCompra}/>
                <Route path="/mis-compras" Component={MisCompras}/>
              </Route>
            </Routes>
          </DetallesCompraProvider>
        </CarritoProvider>
      </AutenticacionProvider>
    </Router>
  );
};

export default App;
