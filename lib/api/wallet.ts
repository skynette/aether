import axios from 'axios'
import { useAuthStore } from '@/lib/store'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface Wallet {
    _id: string
    value: number
    currency: string
    network: string
    address: string
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },
})


api.interceptors.request.use((config) => {
    const token = useAuthStore.getState().token
    if (token) {
        config.headers['Authorization'] = token
    }
    return config
})

export const fetchWallets = async (): Promise<Wallet[]> => {
    try {
        const businessId = useAuthStore.getState().businessId
        if (!businessId) {
            throw new Error('Business ID is not available')
        }
        const response = await api.get('/crypto/wallets', {
            params: { business: businessId }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching wallets:', error)
        throw error
    }
}

export const createWallet = async (newWallet: { currency: string; network: string }): Promise<Wallet> => {
    try {
        const response = await api.post('/crypto/create-wallet', newWallet)
        return response.data
    } catch (error) {
        console.error('Error creating wallet:', error)
        throw error
    }
}