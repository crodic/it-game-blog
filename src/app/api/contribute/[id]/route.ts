import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await prisma.contributes.findUnique({ where: { id: params.id } });
        if (!data) return NextResponse.json({ status: 404, message: 'Contribute not found' }, { status: 404 });
        return NextResponse.json({ status: 200, data }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ status: 500, message: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const data = await prisma.contributes.update({
            where: { id: params.id },
            data: { status: true, seenAt: new Date() },
        });
        return NextResponse.json({ status: 200, data }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ status: 500, message: error.message }, { status: 500 });
    }
}
