import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface User {
    id: string
    email: string
    name?: string
}

export interface AuthState {
    businessId: string | null
    user: User | null
    token: string | null
    login: (user: User, token: string) => void
    logout: () => void
    updateUser: (user: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            businessId: null,
            user: null,
            token: null,
            login: (user, token) => {
                set((state) => ({
                    user: user ? { ...state.user, ...user } : null,
                    token,
                    businessId: state.businessId,
                }));
            },
            logout: () => set({ user: null, token: null }),
            updateUser: (updatedUser) =>
                set((state) => ({
                    user: state.user ? { ...state.user, ...updatedUser } : null,
                    businessId: state.businessId,
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