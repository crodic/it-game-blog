'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export const changeStatus = async (prev: any, formData: FormData) => {
    const status = Object.fromEntries(formData) as { status: 'ONLINE' | 'MAINTENANCE' | 'OFFLINE' };

    await prisma.websiteSetting.updateMany({ data: { serverStatus: status.status } });

    revalidatePath('/dashboard/settings/website');

    return { message: 'Cập nhật trạng thái website thành công' };
};

export const getStatusWebsite = async () => {
    const status = await prisma.websiteSetting.findMany();
    return status[0].serverStatus as 'ONLINE' | 'MAINTENANCE' | 'OFFLINE';
};
