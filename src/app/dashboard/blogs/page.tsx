import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
    return (
        <main>
            <Link href="blogs/create">
                <Button>
                    <Plus className="size-4" />
                    Tạo bài viết
                </Button>
            </Link>
        </main>
    );
}
