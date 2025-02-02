import BlogCard from '@/components/blog-card';
import { cn } from '@/lib/utils';
import { getTrendingBlogs } from '@/services/apis/blogs';
import { Blog } from '@prisma/client';

export default async function BlogsTrending() {
    const data = await getTrendingBlogs().catch(() => []);
    const payload: Blog[] = data;

    if (payload.length < 4) return null;

    return (
        <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Bài viết nổi bật</h4>
            <section
                className={cn(
                    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4',
                    'md:[&>.card-wrapper:first-child]:col-span-3',
                    'sm:[&>.card-wrapper:first-child]:col-span-2'
                )}
            >
                {payload.map((item) => (
                    <BlogCard data={item} key={item.id} showDescription />
                ))}
            </section>
        </div>
    );
}
