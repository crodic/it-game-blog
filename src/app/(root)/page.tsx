import BlogList from '@/components/blog-list';
import GridBlogs from '@/components/grid-blogs';
import Hero from '@/components/hero';

export default function Home() {
    return (
        <div className="wrapper">
            <Hero />
            <main className="space-y-8">
                <GridBlogs />
                <BlogList />
            </main>
        </div>
    );
}
