import xior from 'xior';

export const http = xior.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    cache: 'no-store',
    credentials: 'include',
});
