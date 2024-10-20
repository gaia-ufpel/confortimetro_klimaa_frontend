"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/app/api';
import { fetchMetricTypes } from '@/lib/shared_fetchers';
import { Metric } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { dummyMetrics } from '@/lib/dummyConstructors';
import Edit from './edit';
import RemoveDialog from '@/app/_components/RemoveDialog';

import { Poppins } from 'next/font/google';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ["400"],
});

const MetricTypes = () => {
  const { toast } = useToast();
  const [metricTypes, setMetricTypes] = useState<Metric[] | null>(dummyMetrics);
  const pathname = usePathname();
  const router = useRouter();

  const removeMetricType = async (id: number) => {
    try {
      const response = await api.delete(`/metric-type/${id}`);
      console.log(response.data);
      toast({ title: "Sucesso", description: "Tipo de métrica removido com sucesso" });
      setMetricTypes(prevMetricTypes => prevMetricTypes ? prevMetricTypes.filter(metricType => metricType.id !== id) : null);
    } catch (error) {
      console.error(error);
      toast({ title: "Erro", description: "Não foi possível remover o tipo de métrica, tente novamente." });
    }
  };

  //useEffect(() => {
  //  fetchMetricTypes().then(data => setMetricTypes(data));
  //}, []);

  return (
    <div className='relative flex flex-col'>
      <h1 className={`${poppins.className} text-3xl font-bold mt-4 md:mt-10 text-center`}>Tipos de métricas</h1>

      <button className='absolute top-0 right-0 mt-10 mr-10' onClick={() => { router.push(pathname + `/newmetrictype`) }}>
        <p className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">ADD METRIC TYPE</p>
      </button>

      {metricTypes == null ?
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role='alert'>
          No metrics found
        </div> :
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
                <th scope="col" className="px-6 py-3">
                  Actions
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
                  <td className="px-6 py-4 grid md:flex space-y-1 md:space-y-0 space-x-0 md:space-x-2">
                    <RemoveDialog applyWhenRemove={() => removeMetricType(metricType.id)}
                      trigger='Remover'
                      title='Remover métrica'
                      description='Este processo é irreversível, tem certeza que deseja remover este tipo de métrica?' />
                    <Edit metricType={metricType} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default MetricTypes;