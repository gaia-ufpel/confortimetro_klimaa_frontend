"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getUserInfo } from '@/lib/shared_fetchers';
import { User } from '@/lib/types';

const page = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        getUserInfo().then((data: User) => {
            setUserInfo(data);
        });
    }, []);

    return (
        <div className='flex relative justify-center items-center min-h-screen min-w-screen bg-gray-100'>
            <button className='absolute right-0 top-0 mt-10 mr-10' onClick={() => { router.back() }}>
                <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">Voltar</p>
            </button>
            {
                userInfo ?
                    userInfo?.group === 'admin' ?
                        <button className='absolute right-0 bottom-0 mt-10 mr-10' onClick={() => { router.push('/edit_user') }}>
                            <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">Editar Usuários</p>
                        </button>
                        : ("") : ("")
            }
            {
                userInfo &&
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-sm w-full">
                    <p className="text-xl font-semibold mb-2">Nome: {userInfo?.name}</p>
                    <p className="text-gray-700 mb-2">Email: {userInfo?.email}</p>
                    <p className="text-gray-700">Grupo: {userInfo?.group}</p>
                </div>
            }
        </div>
    )
}

export default page