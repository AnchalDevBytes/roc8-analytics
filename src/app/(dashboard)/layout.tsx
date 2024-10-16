"use client"
import React from 'react'

const DashboardLayout = ({ children } : { children : React.ReactNode     }) => {
  return (
    <div className='flex flex-col min-h-screen min-w-full bg-background max-h-screen'>
        <main className='w-full flex flex-grow'>
            {children}
        </main>
    </div>
  )
}

export default DashboardLayout