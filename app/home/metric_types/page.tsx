"use client";
import React, { useState, useEffect } from 'react';
import { fetchMetricTypes } from '../../../lib/shared_fetchers';
import { Metric } from '../../../lib/types';
import { useRouter, usePathname } from 'next/navigation';


const METRIC_TYPES = () => {
    const router = useRouter();
    const pathname = usePathname();
    useEffect(() => {
        fetchMetricTypes().then(data => setMetricTypes(data))
    }, [])

    const [metricTypes, setMetricTypes] = useState<Metric[] | null>();

    return (
        <div className='relative flex min-h-screen min-w-screen justify-center items-center font-montserrat'>
            <button className='absolute top-0 right-0 mt-10 mr-10' onClick={() => { router.push(pathname + `/newmetrictype`) }}>
                <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">ADD METRIC TYPE</p>
            </button>
            {metricTypes == null ? <div className='font-sans text-2xl'>No metrics to show</div> :
                <div className="relative overflow-x-auto rounded">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xl text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
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
                                <tr key={index} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {metricType.id}
                                    </th>

                                    <td className="px-6 py-4">
                                        {metricType.name}
                                    </td>

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