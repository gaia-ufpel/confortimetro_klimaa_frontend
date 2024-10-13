"use client";
import React, { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { getDevices } from '@/lib/shared_fetchers';
import { Device } from '@/lib/types';

export default function DEVICES() {
    const [devices, setDevices] = useState<Device[] | null>(null)
    const pathname = usePathname();
    const router = useRouter();

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
                            <button onClick={() => console.log('implementar')} className='bg-white text-black font-montserrat border border-gray-300 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline' key={value.id}>
                                <div className='font-bold'>{value.serial_number}</div>
                                {value.model} - {value.location_id}
                            </button>
                        ))
                    )
                }
            </div>
        </div>
    )
}