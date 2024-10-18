"use client"
import { Header } from '@/components'
import React from 'react'

const DashboardLayout = ({ children } : { children : React.ReactNode     }) => {
  return (
    <div className='flex flex-col min-h-screen w-full bg-background max-h-screen'>
        <Header/>
        <main className="min-h-screen pt-20 bg-emerald-200 lg:bg-emerald-50">
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout;
