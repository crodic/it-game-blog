import { Blog } from '@prisma/client';

export const getTrendingBlogs = async () => {
    const res = await fetch('http://localhost:3000/api/blogs/trending');
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};

export const getNewBlogs = async () => {
    const res = await fetch('http://localhost:3000/api/blogs/new');
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};
