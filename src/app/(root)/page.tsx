import Hero from '@/components/hero';
import BlogsTrending from './_components/blogs-trending';
import NewBlogsList from './_components/new-blogs-list';

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
