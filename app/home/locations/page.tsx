"use client";
import React, { useEffect, useState } from 'react'
import { Location } from '@/lib/types';
import { fetchLocations } from '@/lib/shared_fetchers';

const Locations = () => {
  const [locations, setLocations] = useState<Location[] | null>(null);

  return (
    <div className='flex justify-center items-center border-2 min-h-screen p-10'>
      <button className='absolute top-0 right-0 m-10' onClick={() => fetchLocations().then(data => setLocations(data))}>
        <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">SEARCH LOCATIONS</p>
      </button>
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