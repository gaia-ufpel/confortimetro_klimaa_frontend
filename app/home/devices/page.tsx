"use client";
import React, { useState } from 'react'
import Link from 'next/link'
import api from '@/app/api';
import { getDevices } from '@/lib/shared_fetchers';
import { Device } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import Edit from './edit';
import RemoveDialog from '@/lib/RemoveDialog';
import { Poppins } from 'next/font/google';
import RefreshButton from '@/lib/refresh_button';

const poppins = Poppins({
    subsets: ['latin'],
    weight: ["400"],
});

function Page() {
    const { toast } = useToast();
    const [devices, setDevices] = useState<Device[] | null>(null)

    const removeDevice = async (id: number) => {
        try {
            const response = await api.delete(`/device/${id}`);
            console.log(response.data)
            toast({ title: "Sucesso", description: "Dispositivo removido com sucesso" });
            setDevices(prevDevices => prevDevices ? prevDevices.filter(device => device.id !== id) : null);
        } catch (error) {
            console.error(error);
            toast({ title: "Erro", description: "Não foi possível remover o dispositivo, tente novamente." });
        }
    }

    return (
        <div className='relative flex flex-col'>
            <h1 className={`${poppins.className} text-3xl font-bold mt-4 md:mt-10 text-center`}>Dispositivos</h1>

            <div className='absolute top-0 right-0 md:mt-10 md:mr-10'>
                <RefreshButton applyWhenClick={() => getDevices().then(data => setDevices(data))} />
            </div>
            <Link href={`/home/devices/newdevice`} className='flex justify-center my-10'>
                <button>
                    <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">ADICIONAR DISPOSITIVO</p>
                </button>
            </Link>

            <div className='flex justify-center mt-10'>
                {
                    devices == null ?
                        <div className="mt-40 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role='alert'>
                            No devices found
                        </div>
                        :
                        <div className='grid md:grid md:grid-cols-2 lg:grid-cols-4 mx-10 md:mx-32'>
                            {
                                devices.map((value) => (
                                    <div className='relative flex flex-col bg-white text-black font-montserrat border border-gray-300 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline' key={value.id}>
                                        <div className='font-bold'>{value.serial_number}</div>
                                        <p>{value.model} - ID: {value.location_id}</p>
                                        <div className='grid space-y-2 m-3'>
                                            <RemoveDialog applyWhenRemove={() => removeDevice(value.id)}
                                                trigger='Remover Dispositivo'
                                                title='Remover Dispositivo'
                                                description='Este processo é irreversível, tem certeza que deseja remover o dispositivo?' />
                                            <Edit device={value} />
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                }
            </div>
        </div>
    )
}

export default Page