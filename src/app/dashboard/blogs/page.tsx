import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import BlogsView from './_components/blogs-view';

export default function Page() {
    return (
        <main className="space-y-8">
            <Link href="blogs/create">
                <Button>
                    <Plus className="size-4" />
                    Tạo bài viết
                </Button>
            </Link>

            <BlogsView />
        </main>
    );
}
