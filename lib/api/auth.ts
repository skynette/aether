import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

interface LoginCredentials {
    email: string
    password: string
}

interface SignupData {
    country: string
    phone: string
    firstname: string
    lastname: string
    business: string
    email: string
    password: string
}

interface AuthResponse {
    user: {
        id: string
        email: string
        name: string
    }
    token: string
}

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
        console.log({ API_BASE_URL })
        const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials)
        return response.data
    } catch (error) {
        throw new Error('Login failed. Please check your credentials and try again.')
    }
}

export const signup = async (userData: SignupData): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData)
        return response.data
    } catch (error) {
        throw new Error('Signup failed. Please try again or contact support.')
    }
}

export const refreshToken = async (token: string): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { token })
        return response.data
    } catch (error) {
        throw new Error('Token refresh failed. Please log in again.')
    }
}

export const logout = async (token: string): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/auth/logout`, null, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        console.error('Logout failed', error)
    }
}

export const requestPasswordReset = async (email: string): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/auth/password-reset`, { email })
    } catch (error) {
        throw new Error('Password reset request failed. Please try again.')
    }
}

export const resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/auth/change-password`, { token, newPassword })
    } catch (error) {
        throw new Error('Password reset failed. Please try again or request a new reset link.')
    }
}

export const verifyEmail = async (token: string): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/auth/email-verify`, { token })
    } catch (error) {
        throw new Error('Email verification failed. Please try again or contact support.')
    }
}

export const setBiometricLogin = async (token: string, biometricData: any): Promise<void> => {
    try {
        await axios.post(`${API_BASE_URL}/auth/set-biometric-login`, { biometricData }, {
            headers: { Authorization: `Bearer ${token}` },
        })
    } catch (error) {
        throw new Error('Setting up biometric login failed. Please try again.')
    }
}

export const biometricLogin = async (biometricData: any): Promise<AuthResponse> => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/biometric-login`, { biometricData })
        return response.data
    } catch (error) {
        throw new Error('Biometric login failed. Please try again or use password login.')
    }
}