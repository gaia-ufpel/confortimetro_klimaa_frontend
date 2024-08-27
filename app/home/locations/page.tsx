"use client";
import React, { useState } from 'react'


interface Location {
  id: number;
  campus: string;
  building: string;
  room: string;
}
const dummyLocations: Location[] = [
  {
    id: 1,
    campus: "Dummy Campus 1",
    building: "Dummy Building 1",
    room: "Dummy Room 1"
  },
  {
    id: 2,
    campus: "Dummy Campus 2",
    building: "Dummy Building 2",
    room: "Dummy Room 2"
  },
  {
    id: 3,
    campus: "Dummy Campus 3",
    building: "Dummy Building 3",
    room: "Dummy Room 3"
  }
];
const Locations = () => {
  const [locations, setLocations] = useState<Location[]>(dummyLocations);
  return (
    <div className='flex justify-center items-center border-2 min-h-screen p-10'>
      {locations.map((location) => (
        <div key={location.id} className='card bg-white shadow-lg rounded-lg p-6 m-4'>
          <h3 className='campus text-xl font-bold mb-2'>{location.campus}</h3>
          <p className='building text-gray-700'>Building: {location.building}</p>
          <p className='room text-gray-700'>Room: {location.room}</p>
        </div>
      ))}
    </div>
  )
}

export default Locations