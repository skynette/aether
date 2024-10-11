"use client"

import Link from 'next/link'
import { LucideMenu, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Image from 'next/image'
import Sidebar from './sidebar'
import { cn } from '@/lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'


export default function Navbar() {
    const [open, onOpenChange] = useState(false);
    return (
        <header className="w-full z-50">
            <div className="mx-auto px-4">
                <div className="flex justify-between items-center">
                    <Link href='/' className=''>
                        <Image src='/images/logo-light.png' width={100} height={100} alt='Aether logo' className='dark:hidden' />
                        <Image src='/images/logo-light.png' width={100} height={100} alt='Aether logo' className='hidden dark:block' />
                    </Link>
                    <div className="hidden lg:flex items-center gap-2 md:ml-6">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="default" size={"lg"} className="flex items-center space-x-4 py-6">
                                    <Avatar className='p-1'>
                                        <AvatarImage src="/placeholder-user.jpg" alt="User" />
                                        <AvatarFallback>JA</AvatarFallback>
                                    </Avatar>
                                    <span>Joshua Adma</span>
                                    <ChevronDown className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className='w-[200px]'>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href={"/dashboard/profile"} className={cn('')}>
                                        Profile
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="lg:hidden items-center">
                        <Sheet open={open} onOpenChange={onOpenChange}>
                            <SheetTrigger asChild>
                                <Button className={cn('h-auto p-2 lg:hidden')} variant='ghost' size='sm'>
                                    <LucideMenu className='h-6 w-6' />
                                </Button>
                            </SheetTrigger>

                            <SheetContent side={'left'} className='bg-[#F7FAFF] dark:bg-[#111]'>
                                <Sidebar onOpenChange={onOpenChange} />
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    )
}