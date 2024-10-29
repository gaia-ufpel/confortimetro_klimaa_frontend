'use client';
import React from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import Image from 'next/image';
import { MdLock } from "react-icons/md";
import { FiAtSign } from "react-icons/fi";
import Link from 'next/link';
import { login } from '@/lib/actions';

export default function LOGIN() {
  const [state, loginAction] = useFormState(login, undefined);

  return (
    <div className='relative flex flex-col justify-center items-center font-montserrat min-h-screen'>
      <form action={loginAction} className='flex flex-col space-y-4 justify-center items-center p-10'>
        <Image className="w-auto h-auto" src="/login.png" width={180} height={180} alt='login image' priority />
        <div className='relative space-y-8 py-10'>
          <div className='relative flex items-center'>
            <input id="email" name="email" type='email' aria-label='email' className='block text-2xl tracking-wide placeholder-stone-500 w-96 h-16 pr-10 pl-8 appearance-none bg-zinc-300 rounded-[23px] shadow-[0px_4px_4px_#00000040] focus:outline-none peer disabled:opacity-50 disabled:cursor-not-allowed' placeholder="Insira seu email" />
            <FiAtSign className='absolute text-stone-500 right-3 pointer-events-none h-6 w-6' />
            {state?.errors?.email && <div className='absolute translate-y-11 left-4 text-red-500 text-base font-semibold'>{state.errors.email}</div>}
          </div>
          <div className='relative flex items-center'>
            <input id="password" name="password" type='password' aria-label='password' className='block text-[24px] tracking-wide placeholder-stone-500 w-96 h-16 pr-10 pl-8 appearance-none bg-zinc-300 rounded-[23px] shadow-[0px_4px_4px_#00000040] focus:outline-none peer disabled:opacity-50 disabled:cursor-not-allowed' placeholder="Insira sua senha" />
            <MdLock className='absolute text-stone-500 right-3 pointer-events-none h-6 w-6' />
            {state?.errors?.password && <div className='text-red-500 absolute translate-y-11 left-4 text-base font-semibold'>{state.errors.password}</div>}
          </div>
          <button className='absolute right-0 bottom-0 text-zinc-100 text-base font-semibold tracking-[0] hover:underline hover:decoration-solid'> Esqueci minha senha</button>
        </div>
        <SubmitButton />
      </form>
      <div className='flex flex-col space-y-10'>
        <div className='text-zinc-100 text-base font-semibold pointer-events-none'>Ainda não possui uma conta?</div>
        <Link href={`/login/registrar`}>
          <button className='px-10 py-2 bg-[#78DF8C] opacity-75 text-neutral-50 text-xl font-semibold rounded-3xl border-2 border-violet-500 shadow-lg hover:opacity-100 duration-200'>Crie uma conta</button>
        </Link>
      </div>

    </div>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className='px-10 py-2 rounded-xl text-neutral-50 bg-[#885AC6] hover:bg-[#926ec2] shadow-md border-2 border-green-300 font-extrabold text-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#885AC6]' disabled={pending}> Entrar </button>
  )
}
