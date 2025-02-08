import Hero from '@/app/(root)/_components/hero';
import BlogsTrending from './_components/blogs-trending';
import NewBlogsList from './_components/new-blogs-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Trang chủ',
    description: 'Trang chủ',
};

export default function Home() {
    return (
        <div className="wrapper">
            <Hero />
            <main className="space-y-8">
                <BlogsTrending />
                <NewBlogsList />
            </main>
        </div>
    );
}
