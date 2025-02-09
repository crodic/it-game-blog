import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    const serverStatus = await prisma.websiteSetting.findMany();
    if (!serverStatus) return NextResponse.json({ status: 404, message: 'Server status not found' }, { status: 404 });
    if (serverStatus[0].serverStatus === 'OFFLINE')
        return NextResponse.json({ status: 502, message: 'Server is down' }, { status: 502 });
    if (serverStatus[0].serverStatus === 'MAINTENANCE')
        return NextResponse.json({ status: 503, message: 'Server is under maintenance' }, { status: 503 });
    return NextResponse.json({ status: 200, data: 'Server is online' }, { status: 200 });
}
