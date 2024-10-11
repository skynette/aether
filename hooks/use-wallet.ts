import { createWallet, fetchWallets, Wallet } from '@/lib/api/wallet'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export function useWallets() {
    const queryClient = useQueryClient()

    const walletsQuery = useQuery<Wallet[], Error>({
        queryKey: ['wallets'],
        queryFn: fetchWallets,
    })

    const createWalletMutation = useMutation({
        mutationFn: createWallet,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['wallets'] })
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