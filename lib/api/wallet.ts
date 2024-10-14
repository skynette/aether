import { apiClient } from './client'

export interface Wallet {
    _id: string
    value: number
    currency: string
    network: string
    address: string
}

export const fetchWallets = async (): Promise<Wallet[]> => {
    try {
        const businessId = apiClient.getBusinessId()
        return await apiClient.get<Wallet[]>('/crypto/wallets', {
            params: { business: businessId }
        })
    } catch (error) {
        console.error('Error fetching wallets:', error)
        throw error
    }
}

export const createWallet = async (newWallet: { currency: string; network: string }): Promise<Wallet> => {
    try {
        return await apiClient.post<Wallet>('/crypto/create-wallet', newWallet)
    } catch (error) {
        console.error('Error creating wallet:', error)
        throw error
    }
}