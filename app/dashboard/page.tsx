'use client'

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { ArrowUpRight, ArrowDownRight, Wallet, RefreshCw } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatCard } from '@/components/dashboard/stat-card'
import { useUserStore } from '@/lib/store'


export default function DashboardPage() {
    const { user } = useUserStore()
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Welcome back, {user?.firstname || "John Does"}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {/* <StatCard
                    title="Total Balance"
                    value={`${walletInfo?.balance.toFixed(2) ?? '0.00'} ${walletInfo?.currency ?? 'USD'}`}
                    icon={Wallet}
                    isLoading={isLoadingWallet}
                />
                <StatCard
                    title="Last Incoming"
                    value={lastIncoming.toFixed(2)}
                    icon={ArrowUpRight}
                    iconColor="text-green-500"
                    isLoading={isLoadingTransactions}
                />
                <StatCard
                    title="Last Outgoing"
                    value={lastOutgoing.toFixed(2)}
                    icon={ArrowDownRight}
                    iconColor="text-red-500"
                    isLoading={isLoadingTransactions}
                /> */}
            </div>

            <Card className="mb-8">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Recent Transactions</CardTitle>
                        <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                    </div>
                </CardHeader>
                {/* <CardContent>
                    {isLoadingTransactions ? (
                        <p>Loading transactions...</p>
                    ) : (
                        <div className="space-y-4">
                            {(recentTransactions ?? []).slice(0, 5).map((transaction) => (
                                <div key={transaction.id} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        {transaction.type === 'incoming' ? (
                                            <ArrowUpRight className="h-6 w-6 text-green-500" />
                                        ) : (
                                            <ArrowDownRight className="h-6 w-6 text-red-500" />
                                        )}
                                        <div>
                                            <p className="font-medium">{transaction.type === 'incoming' ? 'Received' : 'Sent'}</p>
                                            <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">{transaction.amount.toFixed(2)}</p>
                                        <p className={`text-sm ${transaction.status === 'completed' ? 'text-green-500' :
                                            transaction.status === 'pending' ? 'text-yellow-500' : 'text-red-500'
                                            }`}>
                                            {transaction.status}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-end">
                        <Button>View All Transactions</Button>
                    </div>
                </CardContent> */}
            </Card>

        </div>
    )
}