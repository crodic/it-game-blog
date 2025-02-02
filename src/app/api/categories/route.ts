import { prisma } from '@/lib/prisma';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const GET = async () => {
    try {
        const categories = await prisma.category.findMany();
        return Response.json({ status: 200, data: categories }, { status: 200 });
    } catch (error: any) {
        return Response.json({ message: error.message }, { status: 500 });
    }
};
