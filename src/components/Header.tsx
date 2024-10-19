"use client";
import { LogoutResponseInterface } from '@/interfaces/LogoutResponseInterface';
import axiosClient from '@/lib/axiosClient';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            setIsLoading(true);
            const response : AxiosResponse<LogoutResponseInterface> = await axiosClient.get("/api/logout");
            if(response.data.success) {
                toast.success(response.data.message);
               router.replace("/signin");
            } else {
                const data : LogoutResponseInterface = response.data;
                toast.error(data.message);
            }
            setIsLoading(false);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Unknow error while Logout...");
            }
            setIsLoading(false);
        }
    }

  return (
    <div className="absolute top-0 w-full rounded-b-md px-5 lg:px-[30%] h-16 flex items-center justify-between shadow bg-teal-50 text-black">
        <Link 
            href={"/"} 
            className="text-2xl font-bold md:tracking-wider cursor-pointer"
        >
            roc8-analytics
        </Link>
        <button 
            onClick={handleLogout}
            className="transition duration-300 ease-in-out bg-teal-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-teal-700 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
        >
            { isLoading ? "logging out..." : "Logout" }
        </button>
    </div>
  );
};

export default Header;
