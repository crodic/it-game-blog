/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';
import { getSession } from '@/actions/auth';
import { sendBlogNotificationEmail } from '@/actions/send-mail';
import { prisma } from '@/lib/prisma';
import { BlogSchema } from '@/validations/blog.schema';

export const createBlog = async (values: BlogSchema) => {
    try {
        const session = await getSession();
        if (!session) return { error: 'Vui lặng đăng nhập', data: null };

        const tags = values.tags.map((tag) => tag.text.toLowerCase());
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

        if (data.isPublished) {
            const subscribe = await prisma.subscribe.findMany();
            if (subscribe.length > 0) {
                const emails = subscribe.map((sub) => sub.email);
                for (const email of emails) {
                    const result = await sendBlogNotificationEmail({
                        blogTitle: data.title,
                        summary: data.description,
                        href: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${data.id}`,
                        createdAt: data.createdAt.toString(),
                        to: email,
                    });
                    if (!result.success) {
                        throw new Error('Có lỗi xảy ra, vui lòng thử lại sau.');
                    }
                }
            }
        }

        return { error: null, data };
    } catch (error: any) {
        console.error(error);
        return { error: error.message, data: null };
    }
};
