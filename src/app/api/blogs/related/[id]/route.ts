/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const getCurrentBlog = await prisma.blog.findUnique({
            where: {
                id: params.id,
                isPublished: true,
            },
        });
        if (!getCurrentBlog) return Response.json({ status: 404, message: 'Blog not found' }, { status: 404 });
        const { categoriesId } = getCurrentBlog;
        const blogs = await prisma.blog.findMany({
            take: 4,
            orderBy: {
                views: 'desc',
            },
            where: {
                categoriesId,
                id: {
                    not: params.id,
                },
                isPublished: true,
            },
        });
        return Response.json({ status: 200, data: blogs }, { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return Response.json({ status: 500, message: error.message }, { status: 500 });
    }
};
