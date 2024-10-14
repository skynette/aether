'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { useModalStore } from '@/stores/modal-store'
import { WalletCard } from '@/components/dashboard/wallet-card'
import { ModalManager } from '@/components/modals/modal-manager'
import { useWallets } from '@/hooks/useWallet'

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

    const renderWallets = () => {
        if (isLoading) return <div className="text-center">Loading wallets...</div>
        if (isError) return <div className="text-center text-red-500">Error loading wallets</div>
        if (!wallets) return <div className="text-center">No wallet data available</div>
        if (!Array.isArray(wallets)) {
            console.error('Wallets data is not an array:', wallets)
            return <div className="text-center text-red-500">Invalid wallet data format</div>
        }
        if (wallets.length === 0) return <div className="text-center">No wallets found</div>

        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {wallets.map((wallet) => (
                    <WalletCard
                        key={wallet._id}
                        name={wallet.address}
                        balance={wallet.value}
                        currency={wallet.currency}
                    />
                ))}
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Wallets</h1>
                <Button onClick={() => openModal('createWallet', { onWalletCreated: handleWalletCreated, createWallet })}>
                    Create New Wallet
                </Button>
            </div>
            {renderWallets()}
            <ModalManager />
        </div>
    )
}