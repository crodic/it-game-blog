import { UserSession } from '@/actions/auth';
import { decrypt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';

export const GET = async () => {
    const session = cookies().get('session')?.value;
    if (!session) return Response.json({ message: 'Not logged in' }, { status: 401 });

    try {
        const sessionToken = await decrypt<UserSession>(session);
        if (!sessionToken) return Response.json({ message: 'Unauthorized' }, { status: 401 });
        const authUser = await prisma.user.findUniqueOrThrow({ where: { id: sessionToken.user.id } });
        return Response.json({ token: sessionToken, authUser }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
};
