'use client';

import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { Toaster } from '../ui/toaster';


const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster />
            <Next13ProgressBar height='2px' color='#344D89' options={{ showSpinner: true }} showOnShallow />
        </QueryClientProvider>
    );
};

export default Providers;