'use server';

import { prisma } from '@/lib/prisma';

export const deleteContribute = async (id: string) => {
    try {
        const getContribute = await prisma.contributes.findUnique({
            where: {
                id,
                status: true,
            },
        });

        if (!getContribute) return { error: 'Bạn chưa đọc ý kiến này. Không thể xoá', message: null };

        await prisma.contributes.delete({
            where: {
                id,
            },
        });

        return { error: null, message: 'Xoá ý kiến thành công' };
    } catch (error: any) {
        return { error: error.message, message: null };
    }
};
