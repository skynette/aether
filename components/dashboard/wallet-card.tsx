import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from 'lucide-react'

interface WalletCardProps {
    name: string
    balance: number
    currency: string
}

export function WalletCard({ name, balance, currency }: WalletCardProps) {
    return (
        <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{name}</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{balance.toFixed(2)} {currency}</div>
            </CardContent>
        </Card>
    )
}