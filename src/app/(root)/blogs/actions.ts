import { Blog } from '@prisma/client';

export const incrementView = async (blogId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs?id=${blogId}`, {
        method: 'PUT',
        credentials: 'include',
    });
    return res.json();
};

export const getRelatedBlogs = async (blogId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/related/${blogId}`);
    const payload = await res.json();
    if (!res.ok) throw new Error(payload.message);
    return payload.data as Blog[];
};
