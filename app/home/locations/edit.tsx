import React from 'react';
import { TLocationSchema, LocationSchema } from '@/lib/types';
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
} from "@/components/ui/dialog";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { ring2 } from 'ldrs';

const EditLocation = ({ location }: { location: TLocationSchema }) => {
    ring2.register();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TLocationSchema>({
        resolver: zodResolver(LocationSchema),
        defaultValues: location,
    });

    const editLocation = async (data: TLocationSchema) => {
        try {
            const response = await api.put(`/location/${location.id}`, data);
            console.log(response.data);
            toast({ title: "Sucesso", description: "Localização editada com sucesso" });
        } catch (error) {
            console.error(error);
            toast({ title: "Erro", description: "Não foi possível editar a localização, tente novamente.", variant: 'destructive' });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Editar</Button>
            </DialogTrigger>
            <DialogContent className='rounded'>
                <form onSubmit={handleSubmit(editLocation)}>
                    <DialogHeader>
                        <DialogTitle>Edit Location - {location.campus} - {location.building}</DialogTitle>
                    </DialogHeader>
                    <div className='space-y-4 text-center'>
                        <div>
                            <Label htmlFor='campus'>Campus</Label>
                            <Input defaultValue={location.campus} id="campus" {...register('campus')} disabled={isSubmitting} />
                            {errors.campus && <p className="text-red-500">{errors.campus.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor='building'>Building</Label>
                            <Input defaultValue={location.building} id="building" {...register('building')} disabled={isSubmitting} />
                            {errors.building && <p className="text-red-500">{errors.building.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor='room'>Room</Label>
                            <Input defaultValue={location.room} id="room" {...register('room')} disabled={isSubmitting} />
                            {errors.room && <p className="text-red-500">{errors.room.message}</p>}
                        </div>
                    </div>
                    <DialogFooter className='grid md:flex mt-4 items-center space-y-2 md:space-y-0'>
                        <DialogClose asChild disabled={isSubmitting}>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit" disabled={isSubmitting}>
                            Salvar
                        </Button>
                        {
                            isSubmitting &&
                            <div className='justify-self-center self-center'>
                                <l-ring-2 size={20} stroke={2}></l-ring-2>
                            </div>
                        }
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default EditLocation;