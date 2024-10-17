"use client";
import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Location } from '@/lib/types';
import { fetchLocations } from '@/lib/shared_fetchers';
import api from '@/app/api';
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
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Locations = () => {
  const { toast } = useToast();
  const [locations, setLocations] = useState<Location[] | null>();
  const pathname = usePathname();
  const router = useRouter();

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
    <div className='relative flex justify-center items-center min-h-screen p-10'>
      <div className='absolute flex flex-col top-0 right-0 mt-10 mr-10 space-y-4'>
        <button className='' onClick={() => fetchLocations().then(data => setLocations(data))}>
          <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">SEARCH LOCATIONS</p>
        </button>
        <button className='' onClick={() => { router.push(pathname + `/newlocation`) }}>
          <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">ADD LOCATION</p>
        </button>
      </div>
      {locations == null ?
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role='alert'>
          No locations found
        </div> :
        locations.map((location) => (
          <div key={location.id} className='card bg-white shadow-lg rounded-lg p-6 m-4 text-gray-700'>
            <h3 className='text-xl font-bold mb-2'>{location.campus}</h3>
            <p>ID: {location.id}</p>
            <p>Building: {location.building}</p>
            <p>Room: {location.room}</p>
            <div className='m-3 float-start'>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'outline'}>Remover Local</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className='text-xl'>Remover Local</AlertDialogTitle>
                    <AlertDialogDescription className='font-montserrat'>
                      Este processo é irreversível, tem certeza que deseja remover o local?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogAction onClick={() => { removeLocation(location.id) }}>Remover</AlertDialogAction>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default Locations;