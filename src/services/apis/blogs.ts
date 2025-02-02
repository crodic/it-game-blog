import { Blog } from '@prisma/client';

export const getTrendingBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/trending`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};

export const getNewBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/new`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};

export const getAllBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};

export const getBlogList = async ({ page, limit, q }: { page: number; limit: number; q: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?q=${q}&page=${page}&limit=${limit}`);
    return res.json();
};
