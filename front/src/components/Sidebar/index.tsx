"use client"

import Image from "next/image";
import Navbar from "../Navbar";
import { signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { deleteDataCookie } from '../../app/functions/cookies-actions'
import Link from "next/link";
import { CiLogout } from "react-icons/ci";
import { RiPlayListFill } from "react-icons/ri";

const SideBar = () => {
	const router = useRouter()

	async function logout() {
        deleteDataCookie("next-auth")
		await signOut({
			redirect: false
		})
		router.replace('/auth/sign-in')
	}

    return(
        <>
            <Navbar/>

            <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-8 mt-20 ml-2 font-medium text-xl">
                        <li>
                            <Link href="#" className="pl-2 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <RiPlayListFill  className="text-gray-800 text-4xl text-center font-extrabold"/>
                            <span className="ms-3">Playlist</span>
                            </Link>
                        </li>
                        <li>
                            <Link  
                                href=''
                                className="cursor-pointer pl-2 flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                onClick={logout} 
                            >
                                <CiLogout className="text-gray-800 text-4xl text-center font-extrabold"/>
                                <span
                                    className="flex-1 ms-3 whitespace-nowrap"
                                >
                                    Sign Out
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default SideBar;