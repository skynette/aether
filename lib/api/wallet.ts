import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export interface Wallet {
  id: string
  name: string
  balance: number
  currency: string
}

export const fetchWallets = async (): Promise<Wallet[]> => {
  const response = await axios.get(`${API_BASE_URL}/crypto/wallets`)
  return response.data
}

export const createWallet = async (newWallet: { name: string; currency: string }): Promise<Wallet> => {
  const response = await axios.post(`${API_BASE_URL}/crypto/create-wallet`, newWallet)
  return response.data
}