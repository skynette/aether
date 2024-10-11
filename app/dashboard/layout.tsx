import Providers from '@/components/layout/providers';
import type { Metadata } from 'next';
import "../globals.css"
import Navbar from '@/components/dashboard/navbar';
import { Sidebar } from 'lucide-react';
import ProtectedRoute from '@/components/layout/protected';

export const metadata: Metadata = {
    title: 'Dashboard',
    description: ''
};

export default function DashboardLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <ProtectedRoute>
                        <main className='min-h-screen flex-col'>
                            <nav className='w-full flex items-end'>
                                <Navbar />
                            </nav>
                            <div className='flex'>
                                <div className='hidden lg:block px-5 lg:pt-8'>
                                    <Sidebar />
                                </div>
                                <div className='flex-1'>
                                    {children}
                                </div>
                            </div>
                        </main>
                    </ProtectedRoute>
                </Providers>
            </body>
        </html>
    );
}
