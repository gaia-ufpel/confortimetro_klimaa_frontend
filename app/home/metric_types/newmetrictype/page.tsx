"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { newMetricTypeSchema, TnewMetricTypeSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/app/api';
import { useToast } from '@/hooks/use-toast';


const Page = () => {
    const router = useRouter();
    const { toast } = useToast();

    const postMetricType = async (data: TnewMetricTypeSchema) => {
        try {
            const response = await api.post(`/metric-type`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
            });

            toast({ title: "Sucesso", description: "Tipo de Métrica registrado com sucesso" });
        } catch (error: any) {
            console.error('Erro:', error);
            toast({ title: "Erro", description: "Não foi possível registrar o Tipo de Métrica, tente novamente.", variant: 'destructive' });
        }
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<TnewMetricTypeSchema>({
        resolver: zodResolver(newMetricTypeSchema),
    });

    const onSubmit = async (data: TnewMetricTypeSchema) => {
        const convertedData = {
            ...data,
            id: Number(data.id),
        };
        await postMetricType(convertedData);
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='absolute right-0 top-0 m-10'>
                <button className='' onClick={() => { router.back() }}>
                    <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">Voltar</p>
                </button>
            </div>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <form className='grid gap-y-8' onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>ID:</label>
                        <input
                            placeholder='ID'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none disabled:opacity-50 disabled:pointer-blocked disabled:cursor-not-allowed'
                            disabled={isSubmitting}
                            {...register("id")}
                        />
                        {errors.id && (<p className='text-red-500 mt-1 right-2'>{`${errors.id.message}`}</p>)}
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Nome do Tipo de Métrica:</label>
                        <input
                            placeholder='Metric Type Name'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none disabled:opacity-50 disabled:pointer-blocked disabled:cursor-not-allowed'
                            disabled={isSubmitting}
                            {...register("name")}
                        />
                        {errors.name && (<p className='text-red-500 mt-1 right-2'>{`${errors.name.message}`}</p>)}
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Descrição:</label>
                        <input
                            placeholder='Description'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none disabled:opacity-50 disabled:pointer-blocked disabled:cursor-not-allowed'
                            disabled={isSubmitting}
                            {...register("description")}
                        />
                        {errors.description && (<p className='text-red-500 mt-1 right-2'>{`${errors.description.message}`}</p>)}
                    </div>
                    <button
                        type="submit"
                        className='px-10 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 shadow-md font-bold text-xl disabled:opacity-50 disabled:pointer-blocked disabled:cursor-not-allowed'
                        disabled={isSubmitting}
                    >
                        Registrar Tipo de Métrica
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;
