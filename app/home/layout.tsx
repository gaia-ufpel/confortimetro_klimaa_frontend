import Link from "next/link";
import { BsInfoCircle } from "react-icons/bs";
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaTowerBroadcast } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoSidebarCollapse } from "react-icons/go"; import Logout from "@/lib/logout";
import { checkUserIsAdmin } from "@/lib/session";


export default async function Layout({ children }: { children: React.ReactNode }) {
    const isUserAdmin = await checkUserIsAdmin();
    return (
        <div className='relative min-h-screen min-w-screen bg-gradient-to-b from-[#41D271] to-[#BD95EB]'>
            {children}
            <input type="checkbox" id="navbar-toggle" className="peer hidden" />
            <nav className={`fixed p-1 top-0 bottom-0 flex flex-col justify-between items-center z-10 bg-slate-200 peer-checked:translate-x-0 translate-x-[-40px] duration-500`}>
                <label htmlFor="navbar-toggle" className="absolute top-12 -right-3 cursor-pointer text-3xl md:hover:translate-x-2 duration-200">
                    <GoSidebarCollapse />
                </label>
                <Link href={`/home/profile`} title="Profile">
                    <CgProfile className="w-[30px] h-[30px] hover:text-slate-400"></CgProfile>
                </Link>
                <div className="flex flex-col items-center space-y-2">
                    <Link href="/home/metrics">
                        <button className="p-2 border-2 hover:border-black rounded border-transparent transition duration-300" title="metrics">
                            <TbActivityHeartbeat />
                        </button>
                    </Link>
                    {
                        isUserAdmin &&
                        <Link href="/home/metric_types">
                            <button className="p-2 border-2 hover:border-black rounded border-transparent transition duration-300" title="metric types">
                                <BsInfoCircle />
                            </button>
                        </Link>
                    }
                    {
                        isUserAdmin &&
                        <Link href="/home/devices">
                            <button className="p-2 border-2 hover:border-black rounded border-transparent transition duration-300" title="devices">
                                <FaTowerBroadcast />
                            </button>
                        </Link>
                    }
                    {
                        isUserAdmin &&
                        <Link href="/home/locations">
                            <button className="p-2 border-2 hover:border-black rounded border-transparent transition duration-300" title="locations">
                                <IoLocationSharp />
                            </button>
                        </Link>
                    }
                </div>
                <Logout />
            </nav>
        </div>
    )
}

