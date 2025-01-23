import { cn } from '@/lib/utils';
import BlogCard from './blog-card';
import { Clock4 } from 'lucide-react';

export default function GridBlogs() {
    return (
        <section className="space-y-4">
            <h4 className="font-semibold text-2xl flex items-center">
                <Clock4 className="mr-2" />
                Bài viết nổi bật
            </h4>
            <ul
                className={cn(
                    'grid grid-cols-1 md:grid-cols-2 gap-6 blogs',
                    'md:[&>li:first-child]:row-span-2 md:[&>li:first-child>.blog-card]:flex-col',
                    'md:[&>li:last-child]:col-span-2'
                )}
            >
                {[1, 2, 3, 4].map((item) => (
                    <BlogCard key={item} gridMode />
                ))}
            </ul>
        </section>
    );
}
