import { Blog } from '@prisma/client';

export const getTrendingBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/trending`, { cache: 'no-store' });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};

export const getNewBlogs = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/new`, { cache: 'no-store' });
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};

export const getAllBlogs = async (isDashboard?: boolean) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs${isDashboard ? '?isDashboard=1' : ''}`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};

export const getBlogList = async ({ page, limit, q }: { page: number; limit: number; q: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?q=${q}&page=${page}&limit=${limit}`);
    return res.json();
};

export const getBlogDetail = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${id}`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog;
};

export const getBlogStats = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analysis/blogs`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as { month: string; blog: number }[];
};
