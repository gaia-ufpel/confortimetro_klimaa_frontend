"use client";
import React, { useState, useRef } from 'react'
import Loading_animation from '../../loading_animation';
import api from '@/app/api';

interface Device {
    id: number;
    serial_number: string;
    model: string;
    id_location: number;
}


export default function DEVICES() {
    const [devices, setDevices] = useState<Device[] | null>()
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const signal = abortControllerRef.current?.signal;

    const getDevices = async () => {
        const devicesurl = `${api.defaults.baseURL}/devices/`;
        var data;
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setIsLoading(true);
        try {
            const token = localStorage.getItem('token'); // Obtém o token do localStorage
            const response = await fetch(devicesurl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Adiciona o Bearer Token no cabeçalho
                    'Content-Type': 'application/json',
                },
                signal: abortControllerRef.current?.signal,
            });
            const deviceData = (await response.json()) as Device[]
            setDevices(deviceData)
            setIsLoading(false);
        } catch (e: any) {
            if (e.name === 'AbortError') {
                console.log('Fetch aborted');
                return;
            }
            setError(e)
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='relative flex justify-center min-h-screen items-center'>

            <button className='absolute top-0 right-0 m-10' onClick={getDevices}>
                <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">SEARCH DEVICES</p>
            </button>
            {isLoading && <Loading_animation />}
            <div className='flex md:flex-col'>
                {
                    devices == null ? <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role='alert'>No devices found</div> :
                        devices.map((value) => (
                            <button className='bg-white text-black font-montserrat border border-gray-300 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline' key={value.id}>
                                <div className='font-bold'>{value.serial_number}</div>
                                {value.model} - {value.id_location}
                            </button>
                        ))
                }
            </div>
        </div>
    )
}
