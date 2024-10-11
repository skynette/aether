'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [step, setStep] = useState(1)
    const { requestPasswordReset, resetPassword, isLoading, error } = useAuth()
    const router = useRouter()

    const handleRequestReset = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await requestPasswordReset(email)
        if (success) {
            setStep(2)
        }
    }

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        const success = await resetPassword(email, otp, password)
        if (success) {
            router.push('/login')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <img
                        className="mx-auto h-12 w-auto"
                        src="/placeholder.svg?height=48&width=48"
                        alt="Your Company"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {step === 1 ? 'Reset your password' : 'Enter old password'}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                            sign in to your account
                        </Link>
                    </p>
                </div>
                {step === 1 ? (
                    <form className="mt-8 space-y-6" onSubmit={handleRequestReset}>
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                        <div>
                            <label htmlFor="otp" className="sr-only">
                                OTP
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">
                                Old Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="new-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Old Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                ) : (
                                    <Eye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </form>
                )}
                {error && (
                    <p className="mt-2 text-center text-sm text-red-600" role="alert">
                        {error.message}
                    </p>
                )}
            </div>
        </div>
    )
}