import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
            _count: {
                select: { blogs: true },
            },
            color: true,
        },
    });

    const result = categories.map((category) => ({
        category: category.name,
        value: category._count.blogs,
        fill: category.color,
    }));

    return NextResponse.json({ status: 200, data: result }, { status: 200 });
}
