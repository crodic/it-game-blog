'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ThemeProvider } from 'next-themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
            <QueryClientProvider client={queryClient}>
                {children}
                <ProgressBar height="4px" color="blue" options={{ showSpinner: false }} shallowRouting />
            </QueryClientProvider>
        </ThemeProvider>
    );
};

export default Providers;
