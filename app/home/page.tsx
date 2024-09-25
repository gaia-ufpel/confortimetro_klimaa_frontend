import React from 'react'
import { Geologica } from 'next/font/google';

const geologica = Geologica({
  subsets: ['latin'],
  weight: ["400"],
});

const Home = () => {
  return (
    <div className='flex min-h-screen min-w-screen justify-center items-center'>
      <p className={`${geologica.className} font-2xl`}>Bem vindo! Este é um projeto desenvolvido pelo GAIA na Universidade Federal de Pelotas(UFPel).</p>
    </div>
  )
}

export default Home