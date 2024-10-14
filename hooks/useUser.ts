import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useAuthStore, useUserStore, User } from '@/lib/store'
import { fetchUserData, updateUserData, UserResponse } from '@/lib/api/user'

export function useUser() {
    const queryClient = useQueryClient()
    const { token, clearToken } = useAuthStore()
    const { setUser, setBusiness, clearUserAndBusiness } = useUserStore()

    const userQuery = useQuery<UserResponse, Error>({
        queryKey: ['user'],
        queryFn: fetchUserData,
        enabled: !!token,
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                clearToken()
                clearUserAndBusiness()
                return false
            }
            return failureCount < 3
        },
        select: (data: UserResponse) => {
            setUser(data.user)
            if (data.business) {
                setBusiness(data.business)
            }
            return data
        },
    })

    const updateUserMutation = useMutation<User, Error, Partial<User>>({
        mutationFn: updateUserData,
        onSuccess: (updatedUser) => {
            queryClient.setQueryData<UserResponse>(['user'], (oldData) => {
                if (oldData) {
                    return { ...oldData, user: { ...oldData.user, ...updatedUser } }
                }
                return oldData
            })
            setUser(updatedUser)
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                clearToken()
                clearUserAndBusiness()
            }
        },
    })

    return {
        user: userQuery.data?.user || null,
        business: userQuery.data?.business || null,
        isLoading: userQuery.isLoading,
        isError: userQuery.isError,
        error: userQuery.error,
        refetchUser: userQuery.refetch,
        updateUser: updateUserMutation.mutate,
        isUpdating: updateUserMutation.isPending,
    }
}