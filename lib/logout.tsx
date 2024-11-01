"use client";
import { logout } from "@/lib/actions";
import { MdLogout } from "react-icons/md";

export default function Logout (){
    return (
        <button onClick={() => logout()} title="Sign out">
        <MdLogout className="w-[20px] h-[20px] hover:text-slate-400" />
    </button> 
    )
}