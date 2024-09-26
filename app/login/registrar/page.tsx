"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { MdLock } from 'react-icons/md';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import { signupSchema, TsignupSchema } from '@/lib/types';
import api from '@/app/api';
import { navigate } from '@/app/login/actions';
import { GrValidate } from "react-icons/gr";


const REGISTRAR = () => {
    const [isRegisterSuccessfully, setIsRegisterSuccessfully] = useState<boolean>(false);
    const fetchRegister = async (signUp: Omit<TsignupSchema, 'confirmpassword'>) => {
        try {
            const response = await api.post(`/auth/register`, JSON.stringify(signUp), {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
            });
            setIsRegisterSuccessfully(true);
            setInterval(() => {
                setIsRegisterSuccessfully(false);
                navigate('/login');
            }, 3000);
        } catch (error: any) {
            console.error('Erro:', error);
        }
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TsignupSchema>({
        resolver: zodResolver(signupSchema),
    });


    const onSubmit = async (data: TsignupSchema) => {
        const { confirmpassword, ...signUpData } = data;
        await fetchRegister(signUpData);
    }

    return (
        <div className='flex flex-col min-h-screen min-w-screen items-center justify-center space-y-20'>
            <form className='flex flex-col font-montserrat justify-center items-center' onSubmit={handleSubmit(onSubmit)}>
                <div className='grid space-y-6'>
                    <div className='relative space-y-1'>
                        <label className='block text-neutral-700 text-xl md:text-[24px] font-normal pl-3'>Nome completo</label>
                        <input className={`pl-8 md:pr-10 w-96 md:w-[710px] h-12 md:h-16 bg-zinc-300 rounded-xl md:rounded-3xl shadow-[0px_4px_4px_#00000040] outline-none ${errors.name ? "border-red-500" : ""}`} type='text' {...register('name', { required: true })} disabled={isSubmitting}></input>
                        {errors.name && (<p className='absolute font-semibold text-red-500 right-4'>{`${errors.name.message}`}</p>)}
                    </div>
                    <div className='relative space-y-1'>
                        <label className='block text-neutral-700 text-xl md:text-[24px] font-normal pl-3'>E-mail</label>
                        <input className={`pl-8 md:pr-10 w-96 md:w-[710px] h-12 md:h-16 bg-zinc-300 rounded-xl md:rounded-3xl shadow-[0px_4px_4px_#00000040] outline-none ${errors.email ? "border-red-500" : ""}`} type='email' {...register('email', { required: true })} disabled={isSubmitting}></input>
                        {errors.email && (<p className='absolute font-semibold text-red-500 right-4'>{`${errors.email.message}`}</p>)}
                    </div>
                    <div className='relative space-y-1'>
                        <label className='block text-neutral-700 text-xl md:text-[24px] font-normal pl-3'>Senha</label>
                        <div className='relative flex items-center'>
                            <input className={`pl-8 md:pr-16 w-96 md:w-[710px] h-12 md:h-16 bg-zinc-300 rounded-xl md:rounded-3xl shadow-[0px_4px_4px_#00000040] outline-none ${errors.password ? "border-red-500" : ""}`} type='password' {...register('password', { required: true })} disabled={isSubmitting}></input>
                            <MdLock className='absolute text-stone-500 right-6 pointer-events-none h-7 w-7' />
                        </div>
                        {errors.password && (<p className='absolute text-red-500 font-semibold right-4'>{`${errors.password.message}`}</p>)}
                    </div>
                    <div className='relative space-y-1'>
                        <label className='block text-neutral-700 text-xl md:text-[24px] font-normal pl-3'>Confirme sua senha</label>
                        <div className='relative flex items-center'>
                            <input className={`pl-8 md:pr-16 w-96 md:w-[710px] h-12 md:h-16 bg-zinc-300 rounded-xl md:rounded-3xl shadow-[0px_4px_4px_#00000040] outline-none ${errors.confirmpassword ? "border-red-500" : ""}`} type='password' {...register('confirmpassword', { required: true })} disabled={isSubmitting}></input>
                            <MdLock className='absolute text-stone-500 right-6 pointer-events-none h-7 w-7' />
                        </div>
                        {errors.confirmpassword && (<p className='absolute text-red-500 font-semibold right-4'>{`${errors.confirmpassword.message}`}</p>)}
                    </div>
                    <div className='relative space-y-1'>
                        <label className='block text-neutral-700 text-xl md:text-[24px] font-normal pl-3 font-montserrat'>Classe</label>
                        <select className={`pl-8 md:pr-10 w-96 md:w-[710px] h-12 md:h-16 bg-zinc-300 rounded-xl md:rounded-3xl shadow-[0px_4px_4px_#00000040] outline-none ${errors.group ? "border-red-500" : ""}`} {...register('group', { required: true })} disabled={isSubmitting}>
                            <option value="student">Estudante</option>
                            <option value="professor">Professor</option>
                            <option value="external community">Comunidade Externa</option>
                        </select>
                        {errors.group && (<p className='absolute font-semibold text-red-500 right-4'>{`${errors.group.message}`}</p>)}
                    </div>
                </div>
                <button type="submit" className={`block text-center mt-20 md:mt-40 font-montserrat h-12 px-10 py-2 bg-[#78DF8C] opacity-75 text-neutral-50 text-xl font-semibold rounded-3xl border-2 border-violet-500 shadow-lg hover:opacity-100 duration-200 disabled:pointer-events-none`} disabled={(isSubmitting || isRegisterSuccessfully)}>Crie uma conta</button>
                {   isRegisterSuccessfully &&
                    <div className='relative flex my-4 justify-center items-center space-x-2'>
                        <p className='text-center font-sans font-bold text-[#fdfdfd]'>
                            Usuário registrado com sucesso...
                        </p>
                        <GrValidate className='text-[#28f451] text-2xl'></GrValidate>
                    </div>
                }
            </form>
            <Image src="/register.png" width={250} height={250} alt='register image' className='md:absolute md:left-10 md:bottom-10' />
        </div>
    )
}

export default REGISTRAR