import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await prisma.contributes.findMany();
        return NextResponse.json({ status: 200, data }, { status: 200 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ status: 500, message: error.message }, { status: 500 });
    }
}
