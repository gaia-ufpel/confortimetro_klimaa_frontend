import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, YAxis, XAxis, Tooltip, Legend } from 'recharts';

const transformData = (metrics: any[]) => {
    const groupedData: { [key: string]: any } = {};

    metrics.forEach((metric) => {
        const dateKey = new Date(metric.datetime).toISOString(); // Garantir que datetime esteja formatado corretamente
        if (!groupedData[dateKey]) {
            groupedData[dateKey] = { datetime: dateKey };
        }
        groupedData[dateKey][`metric_${metric.metric_type_id}`] = metric.value;
    });

    return Object.values(groupedData);
};

const Chart = ({ data }: any) => {
    const [ChartData, setChartData] = useState<any>(null);

    const separateDataByMetricType = (data: any[]) => {
        return data.reduce((acc: { [key: number]: any[] }, metric) => {
            if (!acc[metric.metric_type_id]) {
                acc[metric.metric_type_id] = [];
            }
            acc[metric.metric_type_id].push(metric);
            return acc;
        }, {});
    };

    useEffect(() => {
        const separatedData = separateDataByMetricType(data);
        setChartData(separatedData);
        console.log(separatedData);
    }, []);

    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            {
            ChartData && Object.keys(ChartData).map((key) => (
                <div className=''>
                <h1 className='text-center text-xl font-montserrat'>{key}</h1>
                <LineChart
                    key={key}
                    width={800}
                    height={400}
                    data={ChartData[key]}
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
