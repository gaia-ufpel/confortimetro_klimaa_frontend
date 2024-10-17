"use client";
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import api from '@/app/api';
import { getDevices } from '@/lib/shared_fetchers';
import { Device } from '@/lib/types';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';


export default function DEVICES() {
    const { toast } = useToast();
    const [devices, setDevices] = useState<Device[] | null>(null)
    const pathname = usePathname();
    const router = useRouter();
    
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
        <div className='relative flex justify-center min-h-screen items-center'>
            <div className='absolute flex flex-col top-0 right-0 m-10 space-y-4'>
                <button className='' onClick={() => getDevices().then(data => setDevices(data))}>
                    <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">SEARCH DEVICES</p>
                </button>
                <button className='' onClick={() => { router.push(pathname + `/newdevice`) }}>
                    <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">ADD DEVICE</p>
                </button>
            </div>
            <div className='flex md:flex-col'>
                {
                    devices == null ? (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role='alert'>
                            No devices found
                        </div>
                    ) : (
                        devices.map((value) => (
                            <div className='relative bg-white text-black font-montserrat border border-gray-300 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none focus:outline-none focus:shadow-outline' key={value.id}>
                                <div className='font-bold'>{value.serial_number}</div>
                                <p>{value.model} - ID: {value.location_id}</p>
                                <div className='m-3 float-start'>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant={'outline'}>Remover Dispositivo</Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle className='text-xl'>Remover Dispositivo</AlertDialogTitle>
                                                <AlertDialogDescription className='font-montserrat'>
                                                    Este processo é irreversível, tem certeza que deseja remover o dispositivo?
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogAction onClick={() => { removeDevice(value.id) }}>Remover</AlertDialogAction>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    )
}