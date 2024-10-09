"use client";
import React, { useState } from 'react'
import api from '@/app/api';
import { useRouter, usePathname } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LocationSchema, TLocationSchema } from '@/lib/types';
import TimedPopup from '@/app/timed_popup';

const page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isRegisterSuccessfully, setIsRegisterSuccessfully] = useState<boolean>(false);

    const postLocation = async (data: TLocationSchema) => {
        try {
            const response = await api.post(`/locations`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
            });

            setIsRegisterSuccessfully(true);

            setTimeout(() => {
                setIsRegisterSuccessfully(false);
            }, 5000);

        } catch (error: any) {
            console.error('Erro:', error);
        }
    }

    const onSubmit = async (data: any) => {
        const convertedData = {
            ...data,
            id: Number(data.id),
        };
        console.log(convertedData);
        await postLocation(convertedData);
    }

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TLocationSchema>({
        resolver: zodResolver(LocationSchema),
    });

    return (
        <div className='flex relative justify-center items-center min-h-screen min-w-screen' >
            <button className='absolute right-0 top-0 mt-10 mr-10' onClick={() => { router.back() }}>
                <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">Voltar</p>
            </button>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <form className='grid gap-y-8' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>ID:</label>
                        <input
                            placeholder='ID'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                            {...register('id', { required: true })}
                            disabled={isSubmitting}
                        />
                        {errors.id && (<p className='text-red-500'>{errors.id.message}</p>)}
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Campus:</label>
                        <input
                            placeholder='Campus'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                            {...register('campus', { required: true })}
                            disabled={isSubmitting}
                        />
                        {errors.campus && (<p className='text-red-500'>{errors.campus.message}</p>)}
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Building:</label>
                        <input
                            placeholder='Building'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                            {...register('building', { required: true })}
                            disabled={isSubmitting}
                        />
                        {errors.building && (<p className='text-red-500'>{errors.building.message}</p>)}
                    </div>
                    <button
                        type="submit"
                        className='px-10 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 shadow-md font-bold text-xl'
                        disabled={isSubmitting}
                    >
                        Registrar Localidade
                    </button>
                </form>
            </div>
            <div className='absolute right-0 bottom-0 m-10'>
                {isRegisterSuccessfully && <TimedPopup title='Sucesso' message='A localidade foi registrada com sucesso' className='font-mono' />}
            </div>
        </div >
    )
}

export default page