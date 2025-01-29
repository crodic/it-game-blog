import BlogCard from '@/components/blog-card';
import { cn } from '@/lib/utils';

export default function BlogsTrending() {
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
                {[1, 2, 3, 4].map((item) => (
                    <BlogCard key={item} showDescription />
                ))}
            </section>
        </div>
    );
}
