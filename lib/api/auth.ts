import { apiClient } from './client'

export interface LoginCredentials {
    email: string
    password: string
}

export interface SignUpCredentials {
    country: string
    phone: string
    firstname: string
    lastname: string
    business: string
    email: string
    password: string
}

export interface LoginResponse {
    code: number
    data: {
        token: string
    }
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return await apiClient.post<LoginResponse>('/auth/login', credentials)
}

export const signup = async (credentials: SignUpCredentials): Promise<any> => {
    return await apiClient.post('/auth/signup', credentials)
}

export const requestPasswordReset = async (email: string): Promise<any> => {
    return await apiClient.post('/auth/get-otp', { email, action: 'PASSWORD_RESET' })
}

export const resetPassword = async (email: string, otp: string, password: string): Promise<any> => {
    return await apiClient.post('/auth/password-reset', { email, otp, password })
}

export const getOtp = async (email: string): Promise<any> => {
    return await apiClient.post('/auth/get-otp', { email, action: 'VERIFY_EMAIL' })
}

export const verifyEmail = async (email: string, otp: string): Promise<any> => {
    return await apiClient.post('/auth/email-verify', { email, otp })
}