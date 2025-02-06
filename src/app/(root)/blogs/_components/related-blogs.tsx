'use client';

import { CarouselBlogs } from '@/components/carousel-blogs';
import { useQuery } from '@tanstack/react-query';
import { getRelatedBlogs } from '../actions';
import { Separator } from '@/components/ui/separator';

export default function RelatedBlogs({ blogId }: { blogId: string }) {
    const { data, isPending, isError } = useQuery({
        queryKey: ['relatedBlogs', blogId],
        queryFn: () => getRelatedBlogs(blogId),
        enabled: !!blogId,
    });

    if (isError) return <div>Something went wrong</div>;
    if (isPending) return <div>Loading...</div>;
    if (data.length === 0) return null;

    return (
        <div className="space-y-4">
            <div className="w-max">
                <h4 className="text-xl font-semibold">Bài viết liên quan</h4>{' '}
                <Separator className="border-2 border-primary" />
            </div>
            <CarouselBlogs blogs={data} />
        </div>
    );
}
