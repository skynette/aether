"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { nanoid } from 'nanoid';
import { Dispatch, SetStateAction } from 'react';

const links = [
    { name: 'Dashboard', href: '/dashboard/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Wallets', href: '/dashboard/wallet', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { name: 'Settings', href: '/dashboard/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
]

function SideLink({ icon, label, route, isCurrent, onOpenChange }: { icon: string, label: string, route: string, isCurrent: boolean, onOpenChange?: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Link href={route} passHref className=''>
            <Button
                variant={"ghost"}
                size='lg'
                className={cn(
                    "w-full flex justify-start cursor-pointer py-6 px-8 rounded-none",
                    isCurrent
                        ? "bg-primary text-white rounded-none"
                        : "text-primary hover:bg-primary hover:text-white"
                )}
                onClick={() => onOpenChange?.(false)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                </svg>
                <p className="ml-2 font-semibold text-sm tracking-wide">{label}</p>
            </Button>
        </Link>
    )
}

export default function Sidebar({ onOpenChange }: { onOpenChange?: Dispatch<SetStateAction<boolean>> }) {
    const pathname = usePathname()

    const isLinkActive = (href: string) => {
        if (href === '/dashboard/') {
            return pathname === '/dashboard' || pathname === '/dashboard/'
        }
        return pathname === href || pathname.startsWith(href + '/')
    }

    return (
        <div className='flex flex-col lg:mt-0 w-[220px]'>
            <div className='flex flex-col space-y-2 mb-auto'>
                {links.map(link => (
                    <SideLink
                        key={nanoid()}
                        icon={link.icon}
                        label={link.name}
                        route={link.href}
                        isCurrent={isLinkActive(link.href)}
                        onOpenChange={onOpenChange}
                    />
                ))}
            </div>
        </div>
    )
}