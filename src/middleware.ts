/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './actions/auth';

const publicRoute = ['/'];
const privateRoute = ['/dashboard'];
const authRoute = ['/login'];

export async function middleware(request: NextRequest) {
    console.log('trigger middleware');
    // TODO: 1. Kiểm tra và update session khi cần thiết
    updateSession(request);
    const isAuth = await getSession(); // TODO: 2. Biến kiểm tra auth của user
    const currentUrl = request.nextUrl.pathname; // TODO: 3. Lấy đường dẫn hiện tại

    // TODO: 4. Kiem tra route
    if (authRoute.includes(currentUrl) && isAuth) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (privateRoute.includes(currentUrl) && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
