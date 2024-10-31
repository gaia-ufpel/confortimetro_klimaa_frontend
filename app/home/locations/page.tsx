"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Location } from '@/lib/types';
import { fetchLocations } from '@/lib/shared_fetchers';
import Edit from './edit';
import api from '@/app/api';
import { useToast } from '@/hooks/use-toast';
import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400"],
});
import RemoveDialog from '@/lib/RemoveDialog';

const Locations = () => {
  const { toast } = useToast();
  const [locations, setLocations] = useState<Location[] | null>(null);

  useEffect(() => {
    fetchLocations().then(data => setLocations(data));
  }, []);

  const removeLocation = async (id: number) => {
    try {
      const response = await api.delete(`/location/${id}`);
      console.log(response.data);
      toast({ title: "Sucesso", description: "Local removido com sucesso" });
      setLocations(prevLocations => prevLocations ? prevLocations.filter(location => location.id !== id) : null);
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Não foi possível remover o local, tente novamente.", variant: 'destructive' });
    }
  };

  return (
    <div className='relative flex flex-col'>
      <h1 className={`${poppins.className} text-3xl font-bold mt-4 md:mt-10 text-center`}>Localidades</h1>

      <div className='my-10 text-center'>
        <Link href={`/home/locations/newlocation`} className='bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded'>
          ADICIONAR LOCALIDADE
        </Link>
      </div>

      <div className='flex justify-center mt-10'>
        {locations == null ?
          <div className="mt-40 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role='alert'>
            No locations found
          </div> :
          <div className={`flex flex-wrap justify-center mx-10 md:mx-32`}>{
            locations.map((location) => (
              <div key={location.id} className='card bg-white shadow-lg rounded-lg p-6 m-4 text-gray-700 font-montserrat'>
                <h3 className='text-xl font-bold mb-2'>{location.campus}</h3>
                <p>ID: {location.id}</p>
                <p>Building: {location.building}</p>
                <p>Room: {location.room}</p>
                <div className='grid lg:flex space-y-2 lg:space-y-0 lg:space-x-4 m-3'>
                  <RemoveDialog applyWhenRemove={() => removeLocation(location.id)}
                    trigger='Remover Local'
                    title='Remover Local'
                    description='Este processo é irreversível, tem certeza que deseja remover o local?' />
                  <Edit location={location} />
                </div>
              </div>
            ))
          }</div>
        }
      </div>
    </div>
  );
};

export default Locations;