/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './actions/auth';

const publicRoute = ['/'];
const privateRoute = [
    '/dashboard',
    '/dashboard/blogs',
    '/dashboard/blogs/create',
    '/dashboard/blogs/update',
    '/dashboard/categories',
];
const authRoute = ['/login'];

export async function middleware(request: NextRequest) {
    console.log('trigger middleware');

    // 1. Kiểm tra và update session
    const sessionUpdateResult = await updateSession(request);
    if (sessionUpdateResult.redirect) {
        // Nếu cần redirect (ví dụ: session không hợp lệ) thì trả về response redirect ngay
        const response = NextResponse.redirect(new URL(sessionUpdateResult.redirect, request.url));
        return response.cookies.delete('session');
    }

    // Tạo response mặc định để có thể thêm cookie nếu cần
    const response = NextResponse.next();
    if (sessionUpdateResult.newCookie) {
        response.cookies.set({
            name: sessionUpdateResult.newCookie.name,
            value: sessionUpdateResult.newCookie.value,
            httpOnly: sessionUpdateResult.newCookie.options.httpOnly,
            expires: sessionUpdateResult.newCookie.options.expires,
        });
    }

    const isAuth = !!(await getSession());
    const path = request.nextUrl.pathname;

    if (authRoute.includes(path) && isAuth) {
        return NextResponse.redirect(new URL('/', request.url));
    }
    if (privateRoute.includes(path) && !isAuth) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
