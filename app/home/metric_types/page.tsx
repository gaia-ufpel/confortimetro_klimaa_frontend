"use client";
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import api from '@/app/api';
import { fetchMetricTypes } from '@/lib/shared_fetchers';
import { Metric } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const MetricTypes = () => {
  const { toast } = useToast();
  const [metricTypes, setMetricTypes] = useState<Metric[] | null>(null);
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

  useEffect(() => {
    fetchMetricTypes().then(data => setMetricTypes(data));
  }, []);

  return (
    <div className='relative flex justify-center items-center min-h-screen p-10'>
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
                  <td className="px-6 py-4">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant={'outline'}>Remover</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className='text-xl'>Remover métrica</AlertDialogTitle>
                          <AlertDialogDescription className='font-montserrat'>
                            Este processo é irreversível, tem certeza que deseja remover este tipo de métrica?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction onClick={() => { removeMetricType(metricType.id) }}>Remover</AlertDialogAction>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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