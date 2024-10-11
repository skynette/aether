'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useModalStore } from '@/stores/modal-store'
import { WalletCard } from '@/components/dashboard/wallet-card'
import { ModalManager } from '@/components/modals/modal-manager'
import { useWallets } from '@/hooks/use-wallet'


export default function WalletsPage() {
    const { toast } = useToast()
    const openModal = useModalStore(state => state.openModal)
    const { wallets, isLoading, isError, createWallet } = useWallets()

    const handleWalletCreated = () => {
        toast({
            title: "Wallet Created",
            description: "Your new wallet has been successfully created.",
        })
    }

    if (isLoading) return <div className="text-center">Loading wallets...</div>
    // if (isError) return <div className="text-center text-red-500">Error loading wallets</div>

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Wallets</h1>
                <Button onClick={() => openModal('createWallet', { onWalletCreated: handleWalletCreated, createWallet })}>
                    Create New Wallet
                </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wallets?.map((wallet) => (
                    <WalletCard
                        key={wallet.id}
                        name={wallet.name}
                        balance={wallet.balance}
                        currency={wallet.currency}
                    />
                ))}
            </div>
            <ModalManager />
        </div>
    )
}