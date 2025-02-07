import { prisma } from '@/lib/prisma';
import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
    const now = dayjs();

    const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
        const month = now.subtract(i, 'month');
        return {
            start: month.startOf('month').toDate(),
            end: month.endOf('month').toDate(),
            name: month.format('MMMM'),
        };
    }).reverse();

    const blogCounts = await Promise.all(
        lastSixMonths.map(async ({ start, end, name }) => {
            const count = await prisma.blog.count({
                where: {
                    createdAt: {
                        gte: start,
                        lte: end,
                    },
                },
            });
            return { month: name, blog: count };
        })
    );

    return NextResponse.json({ status: 200, data: blogCounts }, { status: 200 });
}
