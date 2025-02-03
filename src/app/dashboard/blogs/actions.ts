/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { prisma } from '@/lib/prisma';

export const deleteBlog = async (id: string) => {
    try {
        await prisma.blog.delete({
            where: {
                id,
            },
        });

        return { error: null, message: 'Xoá blog thành công' };
    } catch (error: any) {
        return { error: error.message, message: null };
    }
};
