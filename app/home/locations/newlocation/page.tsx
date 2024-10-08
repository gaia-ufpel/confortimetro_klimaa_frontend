"use client";
import React, { useState } from 'react'
import api from '@/app/api';
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Location } from '@/lib/types';

const page = () => {
    const router = useRouter();

    const postLocation = async (data: any) => {
        try {
            const response = await api.post(`/locations`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'accept': '*/*',
                },
            });
        } catch (error: any) {
            console.error('Erro:', error);
        }
    }

    const onSubmit = async (data: any) => {
        await postLocation(data);
    }

    //const {
    //    register,
    //    handleSubmit,
    //    formState: { errors, isSubmitting },
    //} = useForm({
    //    resolver: zodResolver(Location),
    //});

        return(
        <div className = 'flex relative justify-center items-center min-h-screen min-w-screen' >
                <button className='absolute right-0 top-0 mt-10 mr-10' onClick={() => { router.back() }}>
                    <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">Voltar</p>
                </button>
            <div className = 'bg-white p-6 rounded-lg shadow-lg' >
                <form className='grid gap-y-8'>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Campus:</label>
                        <input
                            placeholder='Campus'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                        />
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Building:</label>
                        <input
                            placeholder='Building'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                        />
                    </div>
                    <div className='flex flex-col items-start'>
                        <label className='font-mono text-xl font-semibold'>Room:</label>
                        <input
                            placeholder='Room'
                            className='pl-4 pr-4 w-80 h-12 bg-zinc-300 rounded-xl shadow-md outline-none'
                        />
                    </div>
                    <button
                        className='px-10 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 shadow-md font-bold text-xl'
                    >
                        Add location
                    </button>
                </form>
            </div >

        </div >
    )
}

export default page