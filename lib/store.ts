import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// Types
export interface User {
    id: string
    firstname: string
    lastname: string
    email: string
    phone: string
    profileimage: string
}

export interface Business {
    id: string
    business_name: string
    api_key: string
    webhook: string
}

interface UserState {
    user: User | null
    business: Business | null
    setUser: (user: User) => void
    setBusiness: (business: Business) => void
    clearUserAndBusiness: () => void
}

interface AuthState {
    token: string | null
    setToken: (token: string) => void
    clearToken: () => void
}

// User and Business Store
export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            business: null,
            setUser: (user) => set({ user }),
            setBusiness: (business) => set({ business }),
            clearUserAndBusiness: () => set({ user: null, business: null }),
        }),
        {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

// Auth Store
export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({ token }),
            clearToken: () => set({ token: null }),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

// Wallet Store
interface WalletState {
    balance: number
    currency: string
    setBalance: (balance: number) => void
    setCurrency: (currency: string) => void
}

export const useWalletStore = create<WalletState>((set) => ({
    balance: 0,
    currency: 'USD',
    setBalance: (balance) => set({ balance }),
    setCurrency: (currency) => set({ currency }),
}))