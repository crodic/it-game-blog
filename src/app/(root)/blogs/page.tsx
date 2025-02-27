import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
const BlogSearch = dynamic(() => import('./_components/blog-search'), {
    ssr: false,
    loading: () => <div className="flex-1">Đang tải...</div>,
});
const SearchBar = dynamic(() => import('@/components/search-bar'), { ssr: false });

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export const generateMetadata = async ({ searchParams }: Props) => {
    const q = (await searchParams)['q'] || '';
    const page = (await searchParams)['page'] || '1';
    return {
        title: `Trang ${page} - Tìm kiếm bài viết ${q ? `cho: "${q}"` : ''}`,
        default: 'Tìm kiếm bài viết',
    };
};

export default function Page() {
    return (
        <div className="wrapper">
            <div className="flex gap-8">
                <Suspense fallback={<div>Loading...</div>}>
                    <BlogSearch />
                </Suspense>
                <div className="w-80 hidden lg:block">
                    <Card className="sticky top-[84px]">
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h6 className="text-base font-semibold">Tìm kiếm bài viết</h6>
                                <Separator className="border-2 border-primary" />
                            </div>
                            <Suspense fallback={<div>Loading...</div>}>
                                <SearchBar />
                            </Suspense>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
