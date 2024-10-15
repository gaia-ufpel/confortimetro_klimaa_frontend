"use client";
import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/types';

const page = () => {
    const router = useRouter();
    const [userList, setUserList] = useState<User[] | null>(null);
  return (
    <div>
        
    </div>
  )
}

export default page