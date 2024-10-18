"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { DeviceSchema, TDeviceSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import api from '@/app/api';


const Page = () => {
    const { toast } = useToast();
    const router = useRouter();

    const postDevice = async (data: TDeviceSchema) => {
        try {
            const convertedData = {
                ...data,
                id: Number(data.id),
                location_id: Number(data.location_id),
            };
            const response = await api.post(`/device`, JSON.stringify(convertedData), {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
            });
            toast({ title: "Sucesso", description: "Dispositivo registrado com sucesso" });

        } catch (error: any) {
            console.error('Erro:', error);
            toast({ title: "Erro", description: "Não foi possível registrar o dispositivo, tente novamente." });
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TDeviceSchema>({
        resolver: zodResolver(DeviceSchema),
    });

    const onSubmit = async (data: TDeviceSchema) => {
        const convertedData = {
            ...data,
            id: Number(data.id),
            location_id: Number(data.location_id),
        };
        console.log(convertedData)
        await postDevice(convertedData);
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='absolute right-0 top-0 m-10'>
                <button className='' onClick={() => { router.back() }}>
                    <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">Voltar</p>
                </button>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <form className='grid gap-y-8' onSubmit={handleSubmit(postDevice)}>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>ID:</label>
                        <input
                            placeholder='ID'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                            disabled={isSubmitting}
                            {...register("id", { required: true })}
                        />
                        {errors.id && (<p className='text-red-500 mt-1 right-2'>{`${errors.id.message}`}</p>)}
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Número de série:</label>
                        <input
                            placeholder='Serial Number'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                            disabled={isSubmitting}
                            {...register("serial_number", { required: true })}
                        />
                        {errors.serial_number && (<p className='text-red-500 mt-1 right-2'>{`${errors.serial_number.message}`}</p>)}
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Modelo:</label>
                        <input
                            placeholder='Model'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                            disabled={isSubmitting}
                            {...register("model", { required: true })}
                        />
                        {errors.model && (<p className='text-red-500 mt-1 right-2'>{`${errors.model.message}`}</p>)}
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Location ID:</label>
                        <input
                            placeholder='Location ID'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                            disabled={isSubmitting}
                            {...register("location_id", { required: true })}
                        />
                        {errors.location_id && (<p className='text-red-500 mt-1 right-2'>{`${errors.location_id.message}`}</p>)}
                    </div>
                    <button
                        type="submit"
                        className='px-10 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 shadow-md font-bold text-xl'
                        disabled={isSubmitting}
                    >
                        Registrar dispositivo
                    </button>
                    <div className='flex justify-center'>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Page;
