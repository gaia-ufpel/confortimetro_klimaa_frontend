'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdLock } from "react-icons/md";
import { FiAtSign } from "react-icons/fi";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import { GrValidate } from "react-icons/gr";
import { redirect, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import TimedPopup from '../timed_popup';
import api from '../api';
import { navigate } from './actions';

const LOGIN = () => {
  const pathname = usePathname()
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  })
  const [loginError, setLoginError] = useState<string>('')
  const [loginSucess, setLoginSucess] = useState<boolean>(false)

  const login = async () => {
    try {
      const response = await api.post(`/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          'accept': '*/*',
        }
      });
      const data = JSON.parse(response.data);
      const token = data.Authorization.split(' ')[1]; // Para separar só o token de `Bearer {token}`
      localStorage.setItem('token', token);
      api.defaults.headers.Authorization = token;

      setLoginSucess(true);
      setInterval(() => {
        setLoginSucess(false);
        navigate('/home');
      }, 3000);

    } catch (error: any) {
      setLoginError(String(error.message) || 'Erro desconhecido');
      console.error('Erro:', error);
    }
  };

  return (
    <div className='relative flex flex-col justify-center items-center font-montserrat min-h-screen'>
      {loginError && <TimedPopup title={"Login Error"} message={loginError} className={"absolute right-0 bottom-0 m-4 text-2xl font-bold font-montserrat text-center"} />}

      <form className='flex flex-col space-y-4 justify-center items-center p-10'>
        <Image className="w-auto h-auto" src="/login.png" width={180} height={180} alt='login image' priority />
        <div className='relative space-y-8 py-10'>
          <div className='relative flex items-center'>
            <input type='email' aria-label='email' className='block text-2xl tracking-wide placeholder-stone-500 w-96 h-16 pr-10 pl-8 appearance-none bg-zinc-300 rounded-[23px] shadow-[0px_4px_4px_#00000040] focus:outline-none peer' placeholder="Insira seu email" required onChange={(ev) => { setCredentials({ ...credentials, email: ev?.target.value }) }} value={credentials.email} />
            <FiAtSign className='absolute text-stone-500 right-3 pointer-events-none h-6 w-6' />
          </div>
          <div className='relative flex items-center'>
            <input type='password' aria-label='password' className='block text-[24px] tracking-wide placeholder-stone-500 w-96 h-16 pr-10 pl-8 appearance-none bg-zinc-300 rounded-[23px] shadow-[0px_4px_4px_#00000040] focus:outline-none peer' placeholder="Insira sua senha" required onChange={(ev) => { setCredentials({ ...credentials, password: ev?.target.value }) }} value={credentials.password} />
            <MdLock className='absolute text-stone-500 right-3 pointer-events-none h-6 w-6' />
          </div>
          <button className='absolute right-0 bottom-0 text-zinc-100 text-base font-semibold tracking-[0] hover:underline hover:decoration-solid'> Esqueci minha senha</button>
        </div>
        <button type="button" className='px-10 py-2 rounded-xl text-neutral-50 bg-[#885AC6] hover:bg-[#926ec2] shadow-md border-2 border-green-300 font-extrabold text-2xl' onClick={login}> Entrar </button>
        {
          loginSucess
          &&
          <div className='absolute flex text-center items-center space-x-2 bottom-2'>
            <div className='relative font-sans font-bold text-[#fdfdfd]'>Login Bem Sucedido! Redirecionando...</div>
            <GrValidate className='relative text-[#28f451] text-2xl'></GrValidate>
          </div>
        }
      </form>
      <div className='flex flex-col space-y-10'>
        <div className='text-zinc-100 text-base font-semibold pointer-events-none'>Ainda não possui uma conta?</div>
        <Link href={`${pathname}/registrar`}>
          <button className='px-10 py-2 bg-[#78DF8C] opacity-75 text-neutral-50 text-xl font-semibold rounded-3xl border-2 border-violet-500 shadow-lg hover:opacity-100 duration-200'>Crie uma conta</button>
        </Link>
      </div>

    </div>
  )
}

export default LOGIN