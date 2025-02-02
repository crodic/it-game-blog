'use client';

import BlogCard from '@/components/blog-card';
import { PaginationWithLinks } from '@/components/ui/pagination-with-link';
import { Skeleton } from '@/components/ui/skeleton';
import { getBlogList } from '@/services/apis/blogs';
import { Blog } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

interface DataBlog {
    data: Blog[];
    status: number;
    pagination: { currentPage: number; totalPage: number; total: number };
}

export default function BlogSearch() {
    const searchParams = useSearchParams();
    const page = searchParams.get('page') || '1';
    const limit = searchParams.get('limit') || '8';
    const q = searchParams.get('q') || '';

    const { data, isPending, isError } = useQuery<DataBlog>({
        queryKey: ['blogs', page, limit, q],
        queryFn: () => getBlogList({ page: Number(page), limit: Number(limit), q }),
    });

    if (isPending) return <SearchSkeleton />;

    if (isError) return <div>Something went wrong</div>;

    return (
        <div className="flex-1 space-y-8">
            {q && <h4 className="text-xl font-semibold">Kết quả tìm kiếm cho: &ldquo;{q}&ldquo;</h4>}
            {data.data.length > 0 ? (
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.data.map((item) => (
                        <BlogCard data={item} key={item.id} showDescription hiddenTags />
                    ))}
                </section>
            ) : (
                <h3 className="text-2xl font-semibold text-destructive">Không có bài viết nào !!!</h3>
            )}
            {data.data.length > 0 && (
                <PaginationWithLinks
                    page={Number(page)}
                    pageSize={Number(limit)}
                    totalCount={data.pagination.total}
                    siblingCount={2}
                />
            )}
        </div>
    );
}

function SearchSkeleton() {
    return (
        <div className="flex-1 space-y-8">
            <Skeleton className="h-8 w-full" />
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                    <Skeleton key={item} className="h-80" />
                ))}
            </section>
        </div>
    );
}
