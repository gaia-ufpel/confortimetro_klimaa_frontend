'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '@/lib/types'
import api from '@/app/api'
import { useToast } from '@/hooks/use-toast'
import { dummyUsers } from '@/lib/dummyConstructors'
import { Check, ChevronsUpDown, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Edition from './edition'

export default function Page() {
  const { toast } = useToast()
  const router = useRouter()
  const [userList, setUserList] = useState<User[] | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user')
      setUserList(response.data)
    } catch (error) {
      console.error(error)
      toast({
        title: "Erro",
        description: "Não foi possível carregar a lista de usuários, tente novamente mais tarde.",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const filteredUsers = userList?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  return (
    <div className='flex flex-col p-6 relative lg:ml-10'>
      <Button 
        className='absolute right-2 top-2' 
        onClick={() => router.back()}
        variant="outline"
      >
        Voltar
      </Button>

      <h1 className="text-2xl font-bold mb-6 text-center lg:text-start text-white">Editar Usuários</h1>

      <div className="relative flex items-center space-x-2 mb-4">
        <Search className="w-4 h-4 text-white" />
        <Input
          type="text"
          placeholder="Buscar por nome ou email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow placeholder:italic bg-white"
        />
      </div>

      <div className="space-y-2">
        {filteredUsers.map((user) => (
          <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg bg-white opacity-70 hover:opacity-100 transition duration-500 font-sans group">
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              {
                user.is_admin && (
                  <strong className="text-sm text-red-500">Administrador</strong>
                ) 
              }
            </div>
            <Edition user={user}/>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 mt-4">Nenhum usuário encontrado.</p>
      )}
    </div>
  )
}