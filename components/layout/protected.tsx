'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/lib/store'
import Providers from './providers'
import Navbar from '../dashboard/navbar'
import Sidebar from '../dashboard/sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { token } = useAuthStore()
    const router = useRouter()

    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [router, token])

    return (<Providers>
        <main className='min-h-screen flex-col'>
            <nav className='w-full flex items-end'>
                <Navbar />
            </nav>
            <div className='flex'>
                <div className='hidden lg:block px-5 lg:pt-8'>
                    <Sidebar />
                </div>
                <div className='flex-1'>
                    {children}
                </div>
            </div>
        </main>
    </Providers>)
}