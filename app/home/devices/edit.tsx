"use client";
import React from 'react'
import { TDeviceSchema, DeviceSchema } from '@/lib/types';
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

const Edit = ({ device }: { device: TDeviceSchema }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TDeviceSchema>({
        resolver: zodResolver(DeviceSchema),
        defaultValues: device,
    });

    const editDevice = async () => {
        try {
            const response = await api.put(`/device/${device.id}`, device);
            console.log(response.data)
            toast({ title: "Sucesso", description: "Dispositivo editado com sucesso" });
        } catch (error) {
            console.error(error);
            toast({ title: "Erro", description: "Não foi possível editar o dispositivo, tente novamente.", variant: 'destructive' });
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Editar</Button>
            </DialogTrigger>
            <DialogContent className='rounded'>
                <form onSubmit={handleSubmit(editDevice)}>
                    <DialogHeader>
                        <DialogTitle>Edit Device - {device.serial_number} - {device.model}</DialogTitle>
                    </DialogHeader>
                    <div className='space-y-4 text-center'>
                        <span>
                            <Label htmlFor='serial_number'>Serial Number</Label>
                            <Input defaultValue={device.serial_number} id="serial_number" {...register('serial_number')} disabled={isSubmitting} />
                            {errors.serial_number && <p className="text-red-500">{errors.serial_number.message}</p>}
                        </span>
                        <span>
                            <Label htmlFor='model'>Model</Label>
                            <Input defaultValue={device.model} id="model" {...register('model')} disabled={isSubmitting} />
                            {errors.model && <p className="text-red-500">{errors.model.message}</p>}
                        </span>
                        <span className='text-center'>
                            <Label htmlFor='location_id'>Location ID</Label>
                            <Input defaultValue={device.location_id} id="location_id" {...register('location_id', { valueAsNumber: true })} disabled={isSubmitting} />
                            {errors.location_id && <p className="text-red-500">{errors.location_id.message}</p>}

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