import BlogCard from '@/components/blog-card';
import { cn } from '@/lib/utils';

export default function NewBlogsList() {
    return (
        <div className="space-y-4">
            <h4 className="text-2xl font-semibold">Bài viết mới</h4>
            <section className={cn('grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4')}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <BlogCard key={item} showDescription />
                ))}
            </section>
        </div>
    );
}
