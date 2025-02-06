'use server';
import { decrypt, encrypt } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import { AuthSchema } from '@/validations/auth.schema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';
import { User } from '@prisma/client';
import bcrypt from 'bcryptjs';

export interface UserSession {
    user: {
        id: string;
        email: string;
        name: string;
        role: User['role'];
    };
    expires: Date;
}

export async function login(values: AuthSchema) {
    const checkExistingAdminAccount = await prisma.user.findMany({
        where: {
            role: 'ADMIN',
        },
    });

    let user: User | null = null;

    if (!checkExistingAdminAccount.length) {
        const password = bcrypt.hashSync(values.password, 10);
        user = await prisma.user.create({
            data: {
                name: 'Admin',
                email: values.email,
                password,
                role: 'ADMIN',
            },
        });
    } else {
        user = await prisma.user.findUnique({
            where: {
                email: values.email,
                role: 'ADMIN',
            },
        });

        if (!user) {
            return {
                error: 'Tài khoản hoặc mật khẩu không chính xác.',
            };
        }

        const checkPassword = bcrypt.compareSync(values.password, user.password);
        if (!checkPassword) return { error: 'Tài khoản hoặc mật khẩu không chính xác.' };
    }

    const dataSession = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
    };

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const session = await encrypt({ user: dataSession, expires });

    cookies().set('session', session, { expires, httpOnly: true });

    return { error: null, message: 'Đăng nhập thành công.' };
}

export async function logout() {
    cookies().delete('session');
    redirect('/login');
}

export async function getSession(): Promise<UserSession | null> {
    const session = cookies().get('session')?.value;
    if (!session) return null;
    return await decrypt(session);
}

interface UpdateSessionResult {
    redirect?: string;
    newCookie?: {
        name: string;
        value: string;
        options: { httpOnly: boolean; expires: Date };
    };
}

export async function updateSession(request: NextRequest): Promise<UpdateSessionResult> {
    const session = request.cookies.get('session')?.value;
    if (!session) return {};

    const parsed = await decrypt<UserSession>(session);
    if (!parsed) {
        return { redirect: '/login' };
    } else {
        const currentTime = Date.now(); //? Get current time
        const sessionExpires = new Date(parsed.expires).getTime(); //? Get expiration time
        const remainingTime = sessionExpires - currentTime; //? Get remaining time
        const after1days = 1 * 24 * 60 * 60 * 1000;
        // TODO: Check if remaining time is less than 15 minutes
        if (remainingTime < after1days) {
            console.log('Session cũ:', session);
            parsed.expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            const newValue = await encrypt(parsed);
            console.log('Session updated:', newValue);
            return {
                newCookie: {
                    name: 'session',
                    value: newValue,
                    options: { httpOnly: true, expires: parsed.expires },
                },
            };
        }
        return {};
    }
}
