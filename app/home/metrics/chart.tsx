"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';
import { fetchMetricTypes } from '@/lib/shared_fetchers';
import { Metric } from '@/lib/types';

const separateDataByMetricType = (data: any[]) => {
    return data.reduce((acc: { [key: number]: any[] }, metric) => {
        if (!acc[metric.metric_type_id]) {
            acc[metric.metric_type_id] = [];
        }
        const readableMetric = {
            ...metric,
            datetime: new Date(metric.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        acc[metric.metric_type_id].push(readableMetric);
        return acc;
    }, {});
};

const Chart = ({ data } : { data: Metric[]}) => {
    const [metricTypes, setMetricTypes] = useState<Metric[] | null>(null);

    const ChartData = useMemo(() => {
        return data ? separateDataByMetricType(data) : null;
    }, [data]);

    useEffect(() => {
        const fetchData = async () => {
            const metricTypes = await fetchMetricTypes();
            setMetricTypes(metricTypes);
        };
        fetchData();
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 md:gap-y-10'>
            {
                ChartData && Object.keys(ChartData).map((key) => (
                    <div className=''>
                        <h1 className='text-center text-xl font-montserrat text-white font-bold'>
                            {metricTypes?.find(metric => metric.id === Number(key))?.name || "Métrica desconhecida"}
                        </h1>
                        <LineChart
                            key={key}
                            width={800}
                            height={400}
                            data={ChartData[Number(key)]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="datetime" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </div>
                ))
            }
        </div>
    );
};

export default Chart;
