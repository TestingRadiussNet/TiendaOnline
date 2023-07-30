import axios from 'axios';
import React, { useState } from 'react'

import {LOCAL_STORAGE_KEY} from "../../contexts/AutenticacionContext";

import { API_URL } from "../../global/api";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');

  async function submit(ev) {
    ev.preventDefault();

    if (!correo.length || !contrasena.length) {
      alert('Hay campos vacíos');
      return;
    }

    try {
      const respuesta = await axios.post(API_URL+"/autenticacion/login", {
        correo,
        contrasena
      });

      localStorage.setItem(LOCAL_STORAGE_KEY, respuesta.data.data.jwt);
      navigate('/', {replace: true});
    } catch (error) {
      alert(error.response.data['msg']);
    }
  }

  return (
    <form onSubmit={submit} className='bg-white p-4 rounded-xl w-4/5 shadow-xl lg:w-1/4'>
      <legend className="my-4 text-2xl font-bold text-center">Iniciar sesión</legend>

      <div className='my-4'>
        <div className='flex justify-between'>
          <i className='fa-solid fa-envelope text-red-700 text-xl'></i><label htmlFor="" className='font-bold'>Correo</label>
        </div>
        <input value={correo} onInput={(ev) => setCorreo(ev.target.value)} type="text" placeholder='ejemplo@email.com'className='p-2 bg-gray-200 border-b-2 border-b-red-700 w-full'/>
      </div>

      <div className='my-2'>
        <div className='flex justify-between'>
          <i className='fa-solid fa-lock text-red-700 text-xl'></i><label htmlFor="" className='font-bold'>Contraseña</label>
        </div>
        <input value={contrasena} onInput={(ev) => setContrasena(ev.target.value)} type="password" placeholder='Su contraseña' className='p-2 bg-gray-200 border-b-2 border-b-red-700 w-full'/>
      </div>

      <div className='flex flex-col items-center my-8 gap-y-2'>
        <Link to={'/recuperar'} className='hover:text-red-700'>¿Olvidó su contraseña?</Link>
        <Link to={'/crear-cuenta'} className='hover:text-red-700'>¿Es nuevo?</Link>
      </div>

      <button type='submit' className='p-4 bg-blue-400 hover:bg-blue-500 text-white block w-full'>Entrar</button>
    </form>
  )
}

export default Login