import { Metadata } from 'next';
import BlogForm from './_components/blog-form';

export const metadata: Metadata = {
    title: 'DASHBOARD | Tạo bài viết',
    description: 'Trang tạo mới bài viết',
};

export default function Page() {
    return (
        <main className="space-y-8">
            <h3 className="text-2xl font-bold">Tạo Bài Viết</h3>
            <BlogForm />
        </main>
    );
}
