import { Clock4 } from 'lucide-react';
import BlogCard from './blog-card';
import Link from 'next/link';

export default function BlogList() {
    return (
        <section className="space-y-4">
            <Link href={'/blogs'} className="inline-block">
                <h4 className="font-semibold text-2xl flex items-center">
                    <Clock4 className="mr-2" />
                    Bài viết mới
                </h4>
            </Link>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <BlogCard key={item} />
                ))}
            </ul>
        </section>
    );
}
