import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import BlogsView from './_components/blogs-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DASHBOARD | Quản lý bài viết',
    description: 'Trang quản lý bài viết',
};

export default function Page() {
    return (
        <div className="space-y-8">
            <Link href="blogs/create">
                <Button>
                    <Plus className="size-4" />
                    Tạo bài viết
                </Button>
            </Link>

            <BlogsView />
        </div>
    );
}
