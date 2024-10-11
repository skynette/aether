import { useAuthStore, User } from '@/lib/store'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface LoginCredentials {
    email: string
    password: string
}

interface SignUpCredentials {
    country: string
    phone: string
    firstname: string
    lastname: string
    business: string
    email: string
    password: string
}

export function useAuth() {
    const { user, token, login: setAuth, logout: clearAuth } = useAuthStore()
    const [error, setError] = useState<Error | null>(null)

    const loginMutation = useMutation({
        mutationFn: async (credentials: LoginCredentials) => {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
            return response.data
        },
        onSuccess: (data) => {
            const token = data.data.access_token
            const user: User = { id: 'userId', email: data.data.refresh_token }
            setAuth(user, token)
            setError(null)
        },
        onError: (error: Error) => {
            setError(error)
        },
    })

    const signupMutation = useMutation({
        mutationFn: async (credentials: SignUpCredentials) => {
            const response = await axios.post(`${API_BASE_URL}/auth/signup`, credentials)
            return response.data
        },
        onSuccess: (data) => {
            setAuth(data.user, data.token)
            setError(null)
        },
        onError: (error: Error) => {
            setError(error)
        },
    })

    const requestPasswordResetMutation = useMutation({
        mutationFn: async (email: string) => {
            const response = await axios.post(`${API_BASE_URL}/auth/get-otp`, {
                email,
                action: 'PASSWORD_RESET'
            })
            return response.data
        },
        onError: (error: Error) => {
            setError(error)
        },
    })

    const resetPasswordMutation = useMutation({
        mutationFn: async ({ email, otp, password }: { email: string; otp: string; password: string }) => {
            const response = await axios.post(`${API_BASE_URL}/auth/password-reset`, {
                email,
                otp,
                password
            })
            return response.data
        },
        onError: (error: Error) => {
            setError(error)
        },
    })

    const getOtpMutation = useMutation({
        mutationFn: async (email: string) => {
            const response = await axios.post(`${API_BASE_URL}/auth/get-otp`, {
                email,
                action: 'VERIFY_EMAIL'
            })
            return response.data
        },
        onError: (error: Error) => {
            setError(error)
        },
    })

    const verifyEmailMutation = useMutation({
        mutationFn: async ({ email, otp }: { email: string; otp: string }) => {
            const response = await axios.post(`${API_BASE_URL}/auth/email-verify`, { email, otp })
            return response.data
        },
        onError: (error: Error) => {
            setError(error)
        },
    })

    const login = async (credentials: LoginCredentials) => {
        try {
            await loginMutation.mutateAsync(credentials)
            return true
        } catch (error) {
            return false
        }
    }

    const signup = async (credentials: SignUpCredentials) => {
        try {
            await signupMutation.mutateAsync(credentials)
            return true
        } catch (error) {
            return false
        }
    }

    const requestPasswordReset = async (email: string) => {
        try {
            await requestPasswordResetMutation.mutateAsync(email)
            return true
        } catch (error) {
            return false
        }
    }

    const resetPassword = async (email: string, otp: string, password: string) => {
        try {
            await resetPasswordMutation.mutateAsync({ email, otp, password })
            return true
        } catch (error) {
            return false
        }
    }

    const getOtp = async (email: string) => {
        try {
            return await getOtpMutation.mutateAsync(email)
        } catch (error) {
            throw new Error('Failed to get OTP')
        }
    }

    const verifyEmail = async (email: string, otp: string) => {
        try {
            return await verifyEmailMutation.mutateAsync({ email, otp })
        } catch (error) {
            throw new Error('Failed to verify email')
        }
    }

    const logout = () => {
        clearAuth()
    }

    return {
        user,
        token,
        login,
        signup,
        logout,
        getOtp,
        verifyEmail,
        requestPasswordReset,
        resetPassword,
        isLoading: loginMutation.isPending || signupMutation.isPending || requestPasswordResetMutation.isPending || resetPasswordMutation.isPending,
        error,
    }
}