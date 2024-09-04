"use client";
import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';
import { getMetrics } from '@/lib/shared_fetchers';
import { Metrics } from '@/lib/types';
import { generateSensorData } from '@/lib/types';

function separateMetricsByDeviceAndMetricType(metrics: Metrics[]): { [key: number]: { [key: number]: Metrics[] } } {
    return metrics.reduce((acc, metric) => {
        const { device_id, metric_type_id } = metric;
        if (!acc[device_id]) {
            acc[device_id] = {};
        }
        if (!acc[device_id][metric_type_id]) {
            acc[device_id][metric_type_id] = [];
        }
        acc[device_id][metric_type_id].push(metric);
        return acc;
    }, {} as { [key: number]: { [key: number]: Metrics[] } });
}
//generateSensorData(new Date('2023-09-03T03:00:00'), 2)
const GRAPHIC_VIEWER = (props: any) => {
    const [requestedData, setRequestedData] = useState<Metrics[] | null>(null);
    const [perDeviceAndMetricData, setPerDeviceAndMetricData] = useState<{ [key: number]: { [key: number]: Metrics[] } } | null>(null);

    useEffect(() => {
        if (requestedData) {
            setPerDeviceAndMetricData(separateMetricsByDeviceAndMetricType(requestedData));
        }
    }, [requestedData]);

    return (
        <div className='relative flex flex-col justify-center items-center'>
            <button className='top-0 right-0 m-10' onClick={() => getMetrics().then(data => setRequestedData(data))}>
                <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">GET METRICS (ALL OF ALL OF ALL)</p>
            </button>

            {/*perDeviceAndMetricData && (
                Object.keys(perDeviceAndMetricData).map(deviceId => {
                    const metricsByType = perDeviceAndMetricData[Number(deviceId)];

                    return (
                        <div style={{ width: '100%', height: '100%'}} key={deviceId} className='flex flex-col justify-center items-center m-10 bg-slate-200 rounded-md'>
                            <h2 className='text-xl font-bold mb-4'>Device {deviceId}</h2>
                            <LineChart
                                width={screen.width * 0.7}
                                height={screen.height * 0.7}
                                data={requestedData.filter(metric => metric.device_id === Number(deviceId))}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid stroke='#ccc' strokeDasharray="3 3" />
                                <Tooltip />
                                <Legend />
                                <XAxis dataKey="datetime" />
                                <YAxis />
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
                        </div>
                    );
                })
            )*/}
        </div>
    )
}

export default GRAPHIC_VIEWER;
