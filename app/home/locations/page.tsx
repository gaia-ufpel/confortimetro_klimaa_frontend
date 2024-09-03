"use client";
import React, { useEffect, useState } from 'react'
import api from '@/app/api';


interface Location {
  id: number;
  campus: string;
  building: string;
  room: string;
}

const Locations = () => {
  const [locations, setLocations] = useState<Location[] | null>(null);

  const fetchLocations = async () => {
    const locationsUrl = `${api.defaults.baseURL}/locations/`;
    console.log(locationsUrl);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(locationsUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const locationsData = await response.json();
      setLocations(locationsData);
    } catch (e: any) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchLocations()
  }, [])

  return (
    <div className='flex justify-center items-center border-2 min-h-screen p-10'>
      {locations == null ? <div className='font-sans text-2xl'>No locations to show</div> :
        locations.map((location) => (
          <div key={location.id} className='card bg-white shadow-lg rounded-lg p-6 m-4'>
            <h3 className='campus text-xl font-bold mb-2'>{location.campus}</h3>
            <p className='building text-gray-700'>Building: {location.building}</p>
            <p className='room text-gray-700'>Room: {location.room}</p>
          </div>
        ))
      }
    </div>
  )
}

export default Locations