import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from 'lucide-react'

interface StatCardProps {
    title: string
    value: string | number
    icon: LucideIcon
    description?: string
    iconColor?: string
    isLoading?: boolean
}

export function StatCard({ title, value, icon: Icon, description, iconColor = "text-muted-foreground", isLoading = false }: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className={`h-4 w-4 ${iconColor}`} />
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <p className="text-2xl font-bold">Loading...</p>
                ) : (
                    <>
                        <div className="text-2xl font-bold">{value}</div>
                        {description && <p className="text-xs text-muted-foreground">{description}</p>}
                    </>
                )}
            </CardContent>
        </Card>
    )
}