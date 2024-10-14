import { apiClient } from './client'
import { User, Business } from '@/lib/store'

export interface UserResponse {
    user: User
    business: Business | null
}

export const fetchUserData = async (): Promise<UserResponse> => {
    try {
        const response = await apiClient.get<{ code: number; data: any }>('/user/')

        if (response.code !== 200) {
            throw new Error('Failed to fetch user data')
        }

        const userData = response.data
        const user: User = {
            id: userData._id,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            phone: userData.phone,
            profileimage: userData.profileimage
        }

        let business: Business | null = null
        if (userData.business && userData.business.length > 0) {
            business = {
                id: userData.business[0]._id,
                business_name: userData.business[0].business_name,
                api_key: userData.business[0].api_key,
                webhook: userData.business[0].webhook
            }
        }

        return { user, business }
    } catch (error) {
        console.error('Error fetching user data:', error)
        throw error
    }
}

export const updateUserData = async (updatedUserData: Partial<User>): Promise<User> => {
    try {
        const response = await apiClient.put<{ code: number; data: User }>('/user/update', updatedUserData)

        if (response.code !== 200) {
            throw new Error('Failed to update user data')
        }

        return response.data
    } catch (error) {
        console.error('Error updating user data:', error)
        throw error
    }
}