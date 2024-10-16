import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import * as authApi from '@/lib/api/auth'

export function useAuth() {
    const [error, setError] = useState<Error | null>(null)

    const loginMutation = useMutation<authApi.LoginResponse, Error, authApi.LoginCredentials>({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            console.log("login success from mutation")
            setError(null)
        },
        onError: (error: Error) => {
            console.log("Error occcured so setting error from mutation")
            setError(error)
        },
    })

    const signupMutation = useMutation({
        mutationFn: authApi.signup,
        onSuccess: () => {
            setError(null)
        },
        onError: (error: Error) => {
            setError(error)
        },
    })

    const requestPasswordResetMutation = useMutation({
        mutationFn: authApi.requestPasswordReset,
        onError: (error: Error) => {
            setError(error)
        },
    })

    const resetPasswordMutation = useMutation({
        mutationFn: ({ email, otp, password }: { email: string; otp: string; password: string }) =>
            authApi.resetPassword(email, otp, password),
        onError: (error: Error) => {
            setError(error)
        },
    })

    const getOtpMutation = useMutation({
        mutationFn: authApi.getOtp,
        onError: (error: Error) => {
            setError(error)
        },
    })

    const verifyEmailMutation = useMutation({
        mutationFn: ({ email, otp }: { email: string; otp: string }) => authApi.verifyEmail(email, otp),
        onError: (error: Error) => {
            setError(error)
        },
    })

    const login = async (credentials: authApi.LoginCredentials) => {
        try {
            await loginMutation.mutateAsync(credentials)
            return true
        } catch (error) {
            return false
        }
    }

    const signup = async (credentials: authApi.SignUpCredentials) => {
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

    }

    return {
        login,
        signup,
        logout,
        getOtp,
        verifyEmail,
        requestPasswordReset,
        resetPassword,
        isLoading:
            loginMutation.isPending ||
            signupMutation.isPending ||
            requestPasswordResetMutation.isPending ||
            resetPasswordMutation.isPending,
        error,
    }
}