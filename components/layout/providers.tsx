'use client';

import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
} from 'wagmi/chains';
import {
    QueryClientProvider,
    QueryClient,
} from "@tanstack/react-query";
import { Toaster } from '../ui/toaster';


console.log(process.env.NEXT_PUBLIC_ENABLE_TESTNETS);

const config = getDefaultConfig({
    appName: 'Aether',
    projectId: 'xxxxxxxxxxxxxxxx',
    chains: [mainnet, polygon, optimism, arbitrum, base],
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
        && [mainnet, polygon, optimism, arbitrum, base]
    ),
    ssr: true,
});

const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient();
    return (
        // <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {/* <RainbowKitProvider> */}
                    {children}
                    <Toaster />
                    <Next13ProgressBar height='2px' color='#344D89' options={{ showSpinner: true }} showOnShallow />
                {/* </RainbowKitProvider> */}
            </QueryClientProvider>
        // </WagmiProvider>
    );
};

export default Providers;