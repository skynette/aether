import { createWallet, fetchWallets, Wallet } from '@/lib/api/wallet'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export function useWallets() {
    const queryClient = useQueryClient()

    const walletsQuery = useQuery<Wallet[], Error>({
        queryKey: ['wallets'],
        queryFn: fetchWallets,
        // enabled: !!token,
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                return false
            }
            return failureCount < 3
        },
    })

    const createWalletMutation = useMutation<Wallet, Error, { currency: string; network: string }>({
        mutationFn: createWallet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallets'] })
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
            }
        },
    })

    return {
        wallets: walletsQuery.data,
        isLoading: walletsQuery.isLoading,
        isError: walletsQuery.isError,
        createWallet: createWalletMutation.mutate,
        isCreating: createWalletMutation.isPending,
    }
}