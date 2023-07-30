import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../global/api';
import axios from 'axios';

const CrearCuenta = () => {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState('');
  const [paterno, setPaterno] = useState('');
  const [materno, setMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function submit(ev) {
    ev.preventDefault();

    if (!nombre.length || !paterno.length || !materno.length || !correo.length || !telefono.length || !contrasena.length) {
      alert('Hay campos vacíos');
      return;
    }

    try {
      const respuesta = await axios.post(API_URL+"/autenticacion/crear-cuenta", {
        nombre,
        paterno,
        materno,
        correo,
        telefono,
        contrasena
      });

      alert(respuesta.data['msg']);
      navigate('/login', {replace: true});
    } catch (error) {
      alert(error.response.data['msg']);
    }
  }

  return (
    <form onSubmit={submit} className='bg-white p-4 rounded-xl w-4/5 shadow-xl lg:w-1/4'>
    <legend className="my-4 text-2xl font-bold text-center">Crear Cuenta</legend>

    <div className='my-4'>
      <div className='flex justify-between'>
        <i className='fa-solid fa-user text-red-700 text-xl'></i><label htmlFor="" className='font-bold'>Nombre</label>
      </div>
      <input value={nombre} onInput={(ev) => setNombre(ev.target.value)} type="text" placeholder='Su nombre' className='p-2 bg-gray-200 border-b-2 border-b-red-700 w-full'/>
    </div>

    <div className='my-4'>
      <div className='flex justify-between'>
        <i className='fa-solid fa-user text-red-700 text-xl'></i><label htmlFor="" className='font-bold'>Apellido Paterno</label>
      </div>
      <input value={paterno} onInput={(ev) => setPaterno(ev.target.value)} type="text" placeholder='Su apellido paterno' className='p-2 bg-gray-200 border-b-2 border-b-red-700 w-full'/>
    </div>

    <div className='my-4'>
      <div className='flex justify-between'>
        <i className='fa-solid fa-user text-red-700 text-xl'></i><label htmlFor="" className='font-bold'>Apellido Materno</label>
      </div>
      <input value={materno} onInput={(ev) => setMaterno(ev.target.value)} type="text" placeholder='Su apellido materno' className='p-2 bg-gray-200 border-b-2 border-b-red-700 w-full'/>
    </div>
    
    <div className='my-4'>
      <div className='flex justify-between'>
        <i className='fa-solid fa-envelope text-red-700 text-xl'></i><label htmlFor="" className='font-bold'>Correo</label>
      </div>
      <input value={correo} onInput={(ev) => setCorreo(ev.target.value)} type="email" placeholder='ejemplo@email.com' className='p-2 bg-gray-200 border-b-2 border-b-red-700 w-full'/>
    </div>

    <div className='my-4'>
      <div className='flex justify-between'>
        <i className='fa-solid fa-phone text-red-700 text-xl'></i><label htmlFor="" className='font-bold'>Teléfono</label>
      </div>
      <input value={telefono} onInput={(ev) => setTelefono(ev.target.value)} type="tel" maxLength={10} placeholder='Su número telefónico' className='p-2 bg-gray-200 border-b-2 border-b-red-700 w-full'/>
    </div>

    <div className='my-2'>
      <div className='flex justify-between'>
        <i className='fa-solid fa-lock text-red-700 text-xl'></i><label htmlFor="" className='font-bold'>Contraseña</label>
      </div>
      <input value={contrasena} onInput={(ev) => setContrasena(ev.target.value)} type="password" placeholder='Su contraseña' className='p-2 bg-gray-200 border-b-2 border-b-red-700 w-full'/>
    </div>

    <div className='flex flex-col items-center my-8 gap-y-2'>
      <Link to={'/login'} className='hover:text-red-700'>Iniciar Sesión</Link>
    </div>

    <button type='submit' className='p-4 bg-blue-400 hover:bg-blue-500 text-white block w-full'>Crear Cuenta</button>
  </form>
  )
}

export default CrearCuenta