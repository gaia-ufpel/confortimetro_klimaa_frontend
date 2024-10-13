"use client";
import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { fetchLocations, getDevices, getMetricsByDeviceId } from '@/lib/shared_fetchers';
import { TLocationSchema, TDeviceSchema, Metric, generateSensorData } from '@/lib/types';
import Chart from './chart';

const dummyDevices: TDeviceSchema[] = [
  { id: 1, serial_number: 'SN001', model: 'Model A', location_id: 1 },
  { id: 2, serial_number: 'SN002', model: 'Model B', location_id: 1 },
  { id: 3, serial_number: 'SN003', model: 'Model C', location_id: 2 },
];


const METRICS = () => {
  const [locations, setLocations] = useState<TLocationSchema[] | null>(null);
  const [devices, setDevices] = useState<TDeviceSchema[] | null>(dummyDevices);
  const [filteredDevices, setFilteredDevices] = useState<TDeviceSchema[] | null>(null);
  const [selectedDeviceID, setSelectedDeviceID] = useState<string>();
  const [deviceIDMetricData, setDeviceIDMetricData] = useState<any[] | null>(generateSensorData(new Date()));

  //useEffect(() => {
  //  const fetchData = async () => {
  //    //const locationdata = await fetchLocations();
  //    const devicedata = await getDevices();
  //    //setLocations(locationdata);
  //    setDevices(devicedata);
  //  }
  //  fetchData();
  //}, [])

  return (
    <div className='flex justify-center'>
      <div className=''>
        <div className='flex justify-center flex-col md:flex-row md:mt-4 items-center md:items-baseline space-y-4 md:space-y-0 space-x-0 md:space-x-6 rounded-3xl py-8 px-4'>
          <Select value={selectedDeviceID} onValueChange={setSelectedDeviceID}>
            <SelectTrigger className='w-[300px] bg-white'>
              <SelectValue placeholder="Selecione o dispositivo:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  Dispositivos
                </SelectLabel>
                {
                  devices &&
                  devices.map((device) => (
                    <SelectItem key={device.id} value={`${device.id}`}>
                      <p>{device.serial_number} - {device.model}</p>
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>
          <button onClick={() => getMetricsByDeviceId(Number(selectedDeviceID)).then((data) => {setDeviceIDMetricData(data)})} className='px-10 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 shadow-md font-bold text-lg'>
            Ver métricas
          </button>
        </div>
        {/*
          deviceIDMetricData &&
          <Chart data={deviceIDMetricData} /> 
        */}
      </div>
    </div>
  );
};

export default METRICS;