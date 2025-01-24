import BlogCard from './blog-card';
import { Separator } from './ui/separator';

export default function SideBlogs() {
    return (
        <aside className="max-w-80 space-y-4">
            <div>
                <h4 className="text-xl font-semibold">Bài viết nổi bật</h4>
                <Separator className="border-2 border-primary" />
            </div>
            <ul className="flex flex-col gap-4">
                {[1, 2, 3, 4].map((item) => (
                    <BlogCard key={item} />
                ))}
            </ul>
        </aside>
    );
}
