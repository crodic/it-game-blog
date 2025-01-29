/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { getSession } from '@/actions/auth';
import { prisma } from '@/lib/prisma';
import { BlogSchema } from '@/validations/blog.schema';

export const createBlog = async (values: BlogSchema) => {
    try {
        const session = await getSession();
        if (!session) return { error: 'Vui lặng đăng nhập', data: null };

        const tags = values.tags.map((tag) => tag.text);
        const data = await prisma.post.create({
            data: {
                title: values.title,
                content: values.content,
                isPublished: values.isPublished,
                thumbnail: values.thumbnail,
                tags,
                categoriesId: '67983e151264d864b60598f4',
                authorId: session.user.id,
            },
        });
        return { error: null, data };
    } catch (error: any) {
        console.error(error);
        return { error: error.message, data: null };
    }
};
