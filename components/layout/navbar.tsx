import React from 'react'
import { Button, buttonVariants } from '../ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const Navbar = () => {
    return (
        <header className="container mx-auto px-4 py-6 flex justify-between items-center max-w-4xl">
            <div className="text-2xl font-bold text-purple-600">Aether</div>
            <nav className="hidden md:flex space-x-6">
                <a href="#features" className="hover:text-purple-600 transition">Features</a>
                <a href="#how-it-works" className="hover:text-purple-600 transition">How It Works</a>
                <a href="#testimonials" className="hover:text-purple-600 transition">Testimonials</a>
            </nav>
            <Link href="/signup" className={cn(buttonVariants({ variant: "default" }))}>Sign Up</Link>
        </header>
    )
}

export default Navbar