/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
    const searchParams = request.nextUrl.searchParams;
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit');
    const q = searchParams.get('q') || '';
    const isDashboard = Boolean(searchParams.get('isDashboard'));
    try {
        const skip = (Number(page) - 1) * Number(limit);
        const blogs = await prisma.blog.findMany({
            take: limit ? Number(limit) : undefined,
            skip,
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                OR: [
                    {
                        title: {
                            contains: q,
                            mode: 'insensitive',
                        },
                    },
                    {
                        tags: {
                            has: q,
                        },
                    },
                ],
                isPublished: isDashboard ? undefined : true,
            },
        });
        const total = await prisma.blog.count({ where: { isPublished: isDashboard ? undefined : true } });
        const totalPage = Math.ceil(total / Number(limit));
        return Response.json(
            { status: 200, data: blogs, pagination: { currentPage: Number(page), totalPage, total } },
            { status: 200 }
        );
    } catch (error: any) {
        console.error(error.message);
        return Response.json({ status: 500, message: error.message }, { status: 500 });
    }
};

export const PUT = (request: NextRequest) => {
    const blogId = request.nextUrl.searchParams.get('id');
    if (!blogId) return Response.json({ status: 400, message: 'Blog not found' }, { status: 400 });
    const cookieStore = cookies();
    const isHasViewed = cookieStore.get('viewed')?.value === '1' ? true : false;
    if (isHasViewed)
        return Response.json({ status: 400, message: 'You have already viewed this blog' }, { status: 400 });
    try {
        const updateBlog = prisma.blog.update({
            where: {
                id: blogId,
            },
            data: {
                views: { increment: 1 },
            },
        });
        prisma.$transaction([updateBlog]);
        cookieStore.set('viewed', '1', { expires: new Date(Date.now() + 5 * 60 * 1000), httpOnly: true });
        return Response.json({ status: 200, message: 'Viewed blog successfully' }, { status: 200 });
    } catch (error) {
        console.log(error);
        return Response.json({ status: 500, message: error }, { status: 500 });
    }
};
