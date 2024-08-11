"use client";
import React, { useState, useRef } from 'react'
import Loading_animation from '../../loading_animation';

interface Device {
    serial_number: string;
    model: string;
    id_location: number;
}


const moreDummyDevices: Device[] = [
    {
        serial_number: "789012",
        model: "More Dummy Model 1",
        id_location: 2,
    },
    {
        serial_number: "345678",
        model: "More Dummy Model 2",
        id_location: 3,
    },
];


export default function DEVICES() {
    const [devices, setDevices] = useState<Device[]>(moreDummyDevices)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    const signal = abortControllerRef.current?.signal;

    const getDevices = async () => {
        var serialnumber;
        var campus;
        var building;
        var room;
        const devicesurl = '/api/v1/devices';
        var data;
        abortControllerRef.current?.abort();
        abortControllerRef.current = new AbortController();

        setIsLoading(true);
        try {
            data = await fetch(`${devicesurl}`, { method: 'GET', signal: abortControllerRef.current?.signal })
            const deviceData = (await data.json()) as Device[]
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
                    devices.length > 0 ? devices.map((value, index) => (
                        <button className='bg-white text-black font-montserrat border border-gray-300 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline' key={index}>
                            <div className='font-bold'>{value.serial_number}</div>
                            {value.model} - {value.id_location}
                        </button>
                    )) : (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role='alert'>No devices found</div>
                    )
                }
            </div>
        </div>
    )
}
