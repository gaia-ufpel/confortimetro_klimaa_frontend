"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/components/ui/select';
import { fetchLocations, getDevices, getMetricsByDeviceId } from '@/lib/shared_fetchers';
import { TLocationSchema, TDeviceSchema } from '@/lib/types';
import Chart from './chart';


const METRICS = () => {
  const [locations, setLocations] = useState<TLocationSchema[] | null>(null);
  const [devices, setDevices] = useState<TDeviceSchema[] | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>();
  const [selectedDevice, setSelectedDevice] = useState<string>();
  const [deviceIDMetricData, setDeviceIDMetricData] = useState<any[] | null>(null);

  const filteredDevices = useMemo(() => {
    return selectedLocation == 'all' ? devices : devices?.filter(device => device.location_id == Number(selectedLocation));
  }, [selectedLocation])

  useEffect(() => {
    const fetchData = async () => {
      const locationdata = await fetchLocations();
      const devicedata = await getDevices();
      setLocations(locationdata);
      setDevices(devicedata);
    }
    fetchData();
  }, [])

  const handleButton = () => {
    return selectedDevice ?
    getMetricsByDeviceId(Number(selectedDevice)).then((data) => { setDeviceIDMetricData(data) }) : console.log('Selecione um dispositivo');
  }
  return (
    <div className='flex justify-center'>
      <div className=''>
        <div className='flex justify-center flex-col md:flex-row md:mt-4 items-center md:items-baseline space-y-4 md:space-y-0 space-x-0 md:space-x-6 rounded-3xl py-8 px-4'>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className='w-[300px] bg-white'>
              <SelectValue placeholder="Selecione a localização:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  Localizações
                </SelectLabel>
                <SelectItem key="all" value='all'>
                  <p>Todas</p>
                </SelectItem>
                {
                  locations &&
                  locations.map((location) => (
                    <SelectItem key={location.id} value={`${location.id}`}>
                      <p>{location.campus} - {location.building} - {location.room}</p>
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={selectedDevice} onValueChange={setSelectedDevice}>
            <SelectTrigger className='w-[300px] bg-white'>
              <SelectValue placeholder="Selecione o dispositivo:" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>
                  Dispositivos
                </SelectLabel>
                {
                  filteredDevices &&
                  filteredDevices.map((device) => (
                    <SelectItem key={device.id} value={`${device.id}`}>
                      <p>{device.serial_number} - {device.model}</p>
                    </SelectItem>
                  ))
                }
              </SelectGroup>
            </SelectContent>
          </Select>

          <button onClick={handleButton} className='px-10 py-2 rounded-xl text-white bg-purple-600 hover:bg-purple-700 shadow-md font-bold text-lg'>
            Ver métricas
          </button>

        </div>
        {
          deviceIDMetricData &&
          <Chart data={deviceIDMetricData} />
        }
      </div>
    </div>
  );
};

export default METRICS;