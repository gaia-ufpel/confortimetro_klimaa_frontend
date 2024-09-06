"use client";
import React, { useState, useEffect } from 'react'
import { getDevices, getMetricsByDeviceId } from '@/lib/shared_fetchers';
import { Device, Metrics } from '@/lib/types';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';

export default function DEVICES() {
    const [devices, setDevices] = useState<Device[] | null>()
    const [selectedDevice, setSelectedDevice] = useState<Device | null>();
    const [deviceMetrics, setDeviceMetrics] = useState<Metrics[] | null>(null);

    useEffect(() => {
        if (selectedDevice) {
            getMetricsByDeviceId(selectedDevice.id).then(data => setDeviceMetrics(data));
        }
    }, [selectedDevice]);

    const metricsByType = deviceMetrics ? deviceMetrics.reduce((acc: { [key: number]: Metrics[] }, metric) => {
        if (!acc[metric.metric_type_id]) {
            acc[metric.metric_type_id] = [];
        }
        acc[metric.metric_type_id].push(metric);
        return acc;
    }, {}) : {};

    return (
        <div className='relative flex justify-center min-h-screen items-center'>

            <button className='absolute top-0 right-0 m-10' onClick={() => getDevices().then(data => setDevices(data))}>
                <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">SEARCH DEVICES</p>
            </button>
            <div className='flex md:flex-col'>
                {
                    devices == null ? (
                        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role='alert'>
                            No devices found
                        </div>
                    ) : (
                        devices.map((value) => (
                            <button onClick={() => setSelectedDevice(value)} className='bg-white text-black font-montserrat border border-gray-300 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline' key={value.id}>
                                <div className='font-bold'>{value.serial_number}</div>
                                {value.model} - {value.location_id}
                            </button>
                        ))
                    )
                }

                {
                    selectedDevice && (
                        <div className='mt-10'>
                            <h2 className='font-bold text-xl mb-4'>{selectedDevice.serial_number}</h2>
                            {deviceMetrics && deviceMetrics.length > 0 ? (
                                <LineChart
                                    width={800}
                                    height={400}
                                    data={deviceMetrics}
                                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                                >
                                    <CartesianGrid stroke="#ccc" />
                                    <XAxis dataKey="datetime" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    {Object.keys(metricsByType).map(metricTypeId => (
                                        <Line
                                            key={metricTypeId}
                                            type="monotone"
                                            dataKey="value"
                                            data={metricsByType[Number(metricTypeId)]}
                                            name={`Metric ${metricTypeId}`}
                                            stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
                                        />
                                    ))}
                                </LineChart>
                            ) : ("")}
                        </div>
                    )
                }
            </div>
        </div>
    )
}