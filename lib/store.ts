// lib/store.ts
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface User {
    id: string
    email: string
    name: string
}

interface AuthState {
    user: User | null
    token: string | null
    login: (user: User, token: string) => void
    logout: () => void
    updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            login: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
            updateUser: (updatedUser) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedUser } : null,
                })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
)

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