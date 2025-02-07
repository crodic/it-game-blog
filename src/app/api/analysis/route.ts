import { prisma } from '@/lib/prisma';

export const GET = async () => {
    try {
        const blogs = await prisma.blog.count();
        const categories = await prisma.category.count();
        const totalViews = await prisma.blog.aggregate({ _sum: { views: true } });
        const totalSubscribe = await prisma.subscribe.count();

        const data = { blogs, categories, totalViews, totalSubscribe };
        return Response.json({ status: 200, data }, { status: 200 });
    } catch (error: any) {
        console.error(error.message);
        return Response.json({ message: error.message }, { status: 500 });
    }
};
