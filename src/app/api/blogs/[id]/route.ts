/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const blog = await prisma.blog.findUniqueOrThrow({
            where: {
                id: params.id,
            },
        });
        return Response.json({ status: 200, data: blog }, { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return Response.json({ status: 500, message: error.message }, { status: 500 });
    }
};
