import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { fetchUserData, updateUserData, UserResponse } from '@/lib/api/user'
import { User } from '@/lib/store'

export function useUser() {
    const queryClient = useQueryClient()

    const userQuery = useQuery<UserResponse, Error>({
        queryKey: ['user'],
        queryFn: fetchUserData,
        // enabled: !!token,
        staleTime: Infinity,
        retry: (failureCount, error) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                return false
            }
            return failureCount < 3
        },
        select: (data: UserResponse) => {
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
        },
        onError: (error) => {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
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