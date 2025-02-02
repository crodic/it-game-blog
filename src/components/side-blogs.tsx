import { Blog } from '@prisma/client';
import BlogCard from './blog-card';
import { Separator } from './ui/separator';

export default async function SideBlogs() {
    const data = await fetch('http://localhost:3000/api/blogs/trending', { cache: 'force-cache' }).then((res) =>
        res.json()
    );
    const payload: Blog[] = data.data;

    if (payload.length < 4) return null;
    return (
        <aside className="max-w-80 space-y-4">
            <div>
                <h4 className="text-xl font-semibold">Bài viết nổi bật</h4>
                <Separator className="border-2 border-primary" />
            </div>
            <ul className="flex flex-col gap-4">
                {payload.map((item) => (
                    <BlogCard data={item} key={item.id} hiddenTags />
                ))}
            </ul>
        </aside>
    );
}
