"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getUserInfo } from '@/lib/shared_fetchers';
import { User } from '@/lib/types';

const page = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [userInfo, setUserInfo] = useState<User | null>(null);

    useEffect(() => {
        getUserInfo().then((data: User) => {
            setUserInfo(data);
        });
    }, []);

    return (
        <div className='relative flex flex-col space-y-5 '>
            <button className='absolute right-0 top-0 mt-2 mr-2' onClick={() => { router.back() }}>
                <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">Voltar</p>
            </button>
            {
                userInfo &&
                <div className="bg-white bg-opacity-85 shadow-lg rounded-lg p-10 space-y-5 m-12 lg:m-20">
                    <h2 className="text-xl font-semibold mb-2 text-clip">Olá, {userInfo?.name}</h2>
                    <p className="text-gray-700 mb-2"><strong>Email: </strong>{userInfo?.email}</p>
                    <p className="text-gray-700"><strong>Grupo: </strong>{userInfo?.group}</p>
                    {
                        userInfo?.is_active ?
                            <p className="text-green-500">Esta conta está ativa</p>
                            :
                            <p className="text-red-500">Esta conta está inativa</p>
                    }
                    {
                        userInfo?.is_admin &&
                        <p className="text-red-500">Esta conta tem privilégios de administrador</p>
                    }
                </div>
            }
            {
                userInfo &&
                    userInfo?.is_admin == true ?
                    <button className='flex justify-center' onClick={() => { router.push(pathname+`/edit_user`) }}>
                        <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded">Editar Usuários</p>
                    </button>
                    : ("")
            }
        </div>
    )
}

export default page