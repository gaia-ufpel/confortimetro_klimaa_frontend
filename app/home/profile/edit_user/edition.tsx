import React from 'react'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { User } from '@/lib/types'
import { useToast } from '@/hooks/use-toast'
import api from '@/app/api'


const Edition = ({ user }: { user: User }) => {
    const { toast } = useToast()

    const promoteUser = async (id: number) => {
        try {
            const response = await api.put(`/auth/change_privileges/${id}`)
            toast({ title: "Sucesso", description: "O usuário foi promovido para administrador" })
        } catch (error) {
            console.error(error)
            toast({ title: "Erro", description: "Não foi possível realizar esta ação, tente novamente", variant: 'destructive' })
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild className='group lg:invisible group-hover:visible'>
                <Button variant="outline">
                    Editar Usuário
                </Button>
            </SheetTrigger>
            <SheetContent className='font-montserrat'>
                <SheetHeader className='space-y-4'>
                    <SheetTitle>Edição de Usuário</SheetTitle>
                    <SheetDescription className='text-wrap'>Edite as informações do usuário: <strong>{user.name}</strong></SheetDescription>
                    <div>
                        <Label>Nome</Label>
                        <Input defaultValue={user.name} disabled />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input defaultValue={user.email} disabled />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Promover para administrador</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Promover para administrador</DialogTitle>
                            </DialogHeader>
                            <DialogDescription>
                                Deseja promover o usuário <strong>{user.name}</strong> para administrador?
                            </DialogDescription>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant='outline'>Cancelar</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button onClick={() => { promoteUser(user.id) }}>Promover</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </SheetHeader>
                <SheetFooter className='mt-4 gap-2 md:gap-0 md:space-y-0 md:justify-between'>
                    <SheetClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </SheetClose>
                    <Button>Salvar preferências</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Edition