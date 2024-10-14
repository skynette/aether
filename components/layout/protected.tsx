'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { user } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (!user) {
            router.push('/login')
        }
    }, [user, router])

    if (!user) {
        return null
    }

    return <>{children}</>
}