import BlogCard from '@/components/blog-card';
import { cn } from '@/lib/utils';
import { Blog } from '@prisma/client';

export default async function NewBlogsList() {
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/new`, { cache: 'no-cache' }).then((res) =>
        res.json()
    );
    const payload: Blog[] = data.data;

    return (
        <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Bài viết mới</h4>
            <section className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4')}>
                {payload.map((item) => (
                    <BlogCard key={item.id} data={item} showDescription />
                ))}
            </section>
        </div>
    );
}
