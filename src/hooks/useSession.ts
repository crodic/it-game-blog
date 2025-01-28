'use client';

import { UserSession } from '@/actions/auth';
import { useEffect, useState } from 'react';

const useSession = () => {
    const [session, setSession] = useState<UserSession | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const session = await fetch('http://localhost:3000/api/user');
            const data = await session.json();
            setSession(data);
            setIsLoading(false);
        };

        getSession();
    }, []);

    return { session, isLoading };
};

export default useSession;
