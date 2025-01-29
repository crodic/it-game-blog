import { UserSession } from '@/actions/auth';
import { decrypt } from '@/lib/jwt';
import { cookies } from 'next/headers';

export const GET = async () => {
    const session = cookies().get('session')?.value;
    if (!session) return Response.json({ message: 'Not logged in' }, { status: 401 });

    try {
        const user = await decrypt<UserSession>(session);
        return Response.json(user, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }
};
