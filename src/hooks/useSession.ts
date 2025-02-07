/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { logout, UserSession } from '@/actions/auth';
import { User } from '@prisma/client';
import { useEffect, useState } from 'react';

const useSession = () => {
    const [session, setSession] = useState<{ token: UserSession; authUser: Omit<User, 'password'> } | undefined>(
        undefined
    );

    useEffect(() => {
        const getSession = async () => {
            try {
                const session = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`);
                const data = await session.json();
                setSession(data);
            } catch (error: any) {
                if (error.status === 401) {
                    await logout();
                }
            }
        };

        getSession();
    }, []);

    return { session };
};

export default useSession;
