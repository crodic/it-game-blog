'use client';

import { CarouselBlogs } from '@/components/carousel-blogs';
import { useQuery } from '@tanstack/react-query';
import { getRelatedBlogs } from '../actions';

export default function RelatedBlogs({ blogId }: { blogId: string }) {
    const { data, isPending, isError } = useQuery({
        queryKey: ['relatedBlogs', blogId],
        queryFn: () => getRelatedBlogs(blogId),
        enabled: !!blogId,
    });

    if (isError) return <div>Something went wrong</div>;
    if (isPending) return <div>Loading...</div>;

    return <CarouselBlogs blogs={data} />;
}
