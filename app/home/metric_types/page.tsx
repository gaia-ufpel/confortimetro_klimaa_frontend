"use client";
import React, { useState, useEffect } from 'react';
import { fetchMetricTypes } from '../../../lib/shared_fetchers';
import { Metric } from '../../../lib/types';


const METRIC_TYPES = () => {
    useEffect(() => {
        fetchMetricTypes().then(data => setMetricTypes(data))
    }, [])
    
    const [metricTypes, setMetricTypes] = useState<Metric[] | null>();
    
    return (
        <div className='flex min-h-screen min-w-screen justify-center items-center font-montserrat'>
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
                                        ID: {metricType.id}
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