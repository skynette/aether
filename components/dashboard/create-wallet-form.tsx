'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useModalStore } from '@/stores/modal-store'

interface CreateWalletFormProps {
    onWalletCreated: () => void
    createWallet: (newWallet: { name: string; currency: string }) => Promise<void>
}

export function CreateWalletForm({ onWalletCreated, createWallet }: CreateWalletFormProps) {
    const [name, setName] = useState('')
    const [currency, setCurrency] = useState('')
    const [isCreating, setIsCreating] = useState(false)
    const closeModal = useModalStore(state => state.closeModal)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsCreating(true)
        try {
            await createWallet({ name, currency })
            closeModal()
            onWalletCreated()
        } catch (error) {
            console.error('Failed to create wallet:', error)
        } finally {
            setIsCreating(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="name">Wallet Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <Label htmlFor="currency">Currency</Label>
                <Input id="currency" value={currency} onChange={(e) => setCurrency(e.target.value)} required />
            </div>
            <Button type="submit" disabled={isCreating}>
                {isCreating ? 'Creating...' : 'Create Wallet'}
            </Button>
        </form>
    )
}