/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';

export const GET = async () => {
    try {
        const blogs = await prisma.blog.findMany({
            take: 6,
            orderBy: {
                createdAt: 'desc',
            },
        });
        return Response.json({ status: 200, data: blogs }, { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return Response.json({ status: 500, message: error.message }, { status: 500 });
    }
};
