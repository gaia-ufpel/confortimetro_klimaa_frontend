import React from 'react'
import { TnewMetricTypeSchema, newMetricTypeSchema } from '@/lib/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/app/api';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

const Edit = ({ metricType }: { metricType: TnewMetricTypeSchema }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TnewMetricTypeSchema>({
        resolver: zodResolver(newMetricTypeSchema),
        defaultValues: metricType,
    });

    const editMetricType = async (data: TnewMetricTypeSchema) => {
        try {
            const response = await api.put(`/metric-type/${metricType.id}`, data);
            console.log(response.data)
            toast({ title: "Sucesso", description: "Tipo de métrica editado com sucesso" });
        } catch (error) {
            console.error(error);
            toast({ title: "Erro", description: "Não foi possível editar o tipo de métrica, tente novamente.", variant: 'destructive' });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Editar</Button>
            </DialogTrigger>
            <DialogContent className='rounded'>
                <form onSubmit={handleSubmit(editMetricType)}>
                    <DialogHeader>
                        <DialogTitle>Edit Metric Type - {metricType.name}</DialogTitle>
                    </DialogHeader>
                    <div className='space-y-4 text-center'>
                        <span>
                            <Label htmlFor='name'>Name</Label>
                            <Input defaultValue={metricType.name} id="name" {...register('name')} disabled={isSubmitting} />
                            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
                        </span>
                        <span>
                            <Label htmlFor='description'>Description</Label>
                            <Input defaultValue={metricType.description} id="description" {...register('description')} disabled={isSubmitting} />
                            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
                        </span>
                    </div>
                    <DialogFooter className='grid md:flex mt-4 items-center space-y-2 md:space-y-0'>
                        <DialogClose asChild disabled={isSubmitting}>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default Edit