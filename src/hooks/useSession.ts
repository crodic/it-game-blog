/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { logout, UserSession } from '@/actions/auth';
import { useEffect, useState } from 'react';

const useSession = () => {
    const [session, setSession] = useState<UserSession | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            try {
                const session = await fetch('http://localhost:3000/api/users');
                const data = await session.json();
                setSession(data);
                setIsLoading(false);
            } catch (error: any) {
                if (error.status === 401) {
                    await logout();
                }
            }
        };

        getSession();
    }, []);

    return { session, isLoading };
};

export default useSession;
