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
        const data = await prisma.blog.create({
            data: {
                title: values.title,
                content: values.content,
                isPublished: values.isPublished,
                thumbnail: values.thumbnail,
                tags,
                categoriesId: values.categoriesId,
                authorId: session.user.id,
                description: values.description,
            },
        });
        return { error: null, data };
    } catch (error: any) {
        console.error(error);
        return { error: error.message, data: null };
    }
};
