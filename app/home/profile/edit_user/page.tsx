"use client";
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';
import api from '@/app/api';
import { useToast } from '@/hooks/use-toast';
import { dummyUsers } from '@/lib/dummyConstructors';
import { Check, ChevronsUpDown } from "lucide-react"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const page = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [userList, setUserList] = useState<User[] | null>(dummyUsers);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/user');
      setUserList(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {

  }, [])

  return (
    <div>

    </div>
  )
}

export default page