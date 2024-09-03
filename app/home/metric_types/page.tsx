"use client";
import React, { useState, useEffect, useRef } from 'react';
import Loading_animation from '../../loading_animation';
import api from '@/app/api';

interface Metric {
    name: string;
    description: string;
}


const METRIC_TYPES = () => {
    useEffect(() => {
        fetchMetricTypes()
    }, [])
    
    const [metricTypes, setMetricTypes] = useState<Metric[] | null>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    
    const fetchMetricTypes = async () => {
        const metricTypesUrl = `${api.defaults.baseURL}/metric-type/`;
        try {
            const token = localStorage.getItem('token'); // Obtém o token do localStorage
            const response = await fetch(metricTypesUrl, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Adiciona o Bearer Token no cabeçalho
                    'Content-Type': 'application/json',
                },
            });
    
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
    
            const metricTypesData = await response.json();
            setMetricTypes(metricTypesData);
        } catch (e: any) {
            console.log(e);
        }
    };
    
    
    return (
        <div className='flex min-h-screen min-w-screen justify-center items-center font-montserrat'>
            {isLoading && <Loading_animation />}
            {error && <div>Error loading data</div>}
            {metricTypes == null ? <div className='font-sans text-2xl'>No metrics to show</div> :
                <div className="relative overflow-x-auto rounded">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Metric
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Description
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {metricTypes.map((metricType: Metric, index: number) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {metricType.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {metricType.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </div>
    )
}

export default METRIC_TYPES