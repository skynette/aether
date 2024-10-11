'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Eye, EyeOff } from 'lucide-react'

interface SignUpData {
    country: string
    phone: string
    firstname: string
    lastname: string
    business: string
    email: string
    password: string
}

export default function SignUpPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState<SignUpData>({
        country: '',
        phone: '',
        firstname: '',
        lastname: '',
        business: '',
        email: '',
        password: '',
    })
    const [otp, setOtp] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const { getOtp, verifyEmail, signup, isLoading } = useAuth()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleGetOtp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await getOtp(formData.email)
            setStep(2)
        } catch (error) {
            setError('Failed to send OTP. Please try again.')
        }
    }

    const handleVerifyEmail = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await verifyEmail(formData.email, otp)
            setStep(3)
        } catch (error) {
            setError('Failed to verify email. Please check your OTP and try again.')
        }
    }

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        try {
            await signup(formData)
            router.push('/dashboard')
        } catch (error) {
            setError('Failed to sign up. Please try again.')
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
                        Create your account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link href="/login" className="font-medium text-primary hover:text-primary/90">
                            sign in to your account
                        </Link>
                    </p>
                </div>
                {step === 1 && (
                    <form className="mt-8 space-y-6" onSubmit={handleGetOtp}>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {isLoading ? 'Sending OTP...' : 'Get OTP'}
                            </button>
                        </div>
                    </form>
                )}
                {step === 2 && (
                    <form className="mt-8 space-y-6" onSubmit={handleVerifyEmail}>
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
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {isLoading ? 'Verifying...' : 'Verify Email'}
                            </button>
                        </div>
                    </form>
                )}
                {step === 3 && (
                    <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="country" className="sr-only">
                                    Country
                                </label>
                                <input
                                    id="country"
                                    name="country"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Country"
                                    value={formData.country}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="sr-only">
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="firstname" className="sr-only">
                                    First Name
                                </label>
                                <input
                                    id="firstname"
                                    name="firstname"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="First Name"
                                    value={formData.firstname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="sr-only">
                                    Last Name
                                </label>
                                <input
                                    id="lastname"
                                    name="lastname"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Last Name"
                                    value={formData.lastname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="business" className="sr-only">
                                    Business
                                </label>
                                <input
                                    id="business"
                                    name="business"
                                    type="text"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Business"
                                    value={formData.business}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
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
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                {isLoading ? 'Signing up...' : 'Sign up'}
                            </button>
                        </div>
                    </form>
                )}
                {error && (
                    <p className="mt-2 text-center text-sm text-red-600" role="alert">
                        {error}
                    </p>
                )}
            </div>
        </div>
    )
}