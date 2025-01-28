import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Page() {
    return (
        <main>
            <Button>
                <Plus className="size-4" />
                Tạo bài viết
            </Button>
        </main>
    );
}
