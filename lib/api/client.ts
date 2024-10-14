import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useAuthStore, useUserStore } from '@/lib/store'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

class ApiClient {
    private static instance: ApiClient
    private api: AxiosInstance

    private constructor() {
        this.api = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
        })

        this.api.interceptors.request.use((config) => {
            const token = useAuthStore.getState().token
            if (token) {
                config.headers['Authorization'] = token
            }
            return config
        })
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient()
        }
        return ApiClient.instance
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.get<T>(url, config)
        return response.data
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.post<T>(url, data, config)
        return response.data
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.put<T>(url, data, config)
        return response.data
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response = await this.api.delete<T>(url, config)
        return response.data
    }

    public getBusinessId(): string {
        const businessId = useUserStore.getState().business?.id
        if (!businessId) {
            throw new Error('Business ID is not available')
        }
        return businessId
    }
}

export const apiClient = ApiClient.getInstance()