'use server';

import { getSession } from '@/actions/auth';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { hashSync, compareSync } from 'bcryptjs';

export const changeAvatar = async (avatar: string) => {
    const session = await getSession();
    if (!session) return null;
    const data = await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            avatar,
        },
    });

    return data;
};

export const updateName = async (name: string) => {
    const session = await getSession();
    if (!session) return { error: 'Not logged in' };
    const data = await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            name,
        },
    });

    revalidatePath('/dashboard/account');

    return {
        name: data.name,
    };
};

const passwordSchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters long.'),
        newPassword: z.string().min(6, 'Password must be at least 6 characters long.'),
        confirmPassword: z.string().min(6, 'Password must be at least 6 characters long.'),
    })
    .superRefine(({ newPassword, confirmPassword }, ctx) => {
        if (newPassword !== confirmPassword) {
            ctx.addIssue({
                code: 'custom',
                message: 'Passwords do not match.',
            });
        }
    });

export const changePassword = async (prevState: any, formData: FormData) => {
    const session = await getSession();
    if (!session) return null;

    const data = Object.fromEntries(formData) as Record<string, string>;

    const parsed = passwordSchema.safeParse(data);
    if (!parsed.success) {
        return { error: parsed.error.flatten().fieldErrors };
    }

    const findUser = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        select: {
            password: true,
        },
    });
    if (!findUser) {
        return {
            error: {
                password: ['Mật khẩu không chính xác.'],
            },
        };
    }
    const currentPassword = compareSync(parsed.data.password, findUser.password);
    if (!currentPassword) {
        return {
            error: {
                password: ['Mật khẩu không chính xác.'],
            },
        };
    }
    const hashPassword = hashSync(parsed.data.newPassword, 10);

    const user = await prisma.user.update({
        where: {
            id: session.user.id,
        },
        data: {
            password: hashPassword,
        },
    });

    if (!user) {
        return {
            error: {
                password: ['Có lỗi xảy ra. Vui liệu thử lại sau.'],
            },
        };
    }

    revalidatePath('/dashboard/account');

    return {
        name: user.name,
    };
};
