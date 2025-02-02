import { CarouselBlogs } from '@/components/carousel-blogs';
import SearchBar from '@/components/search-bar';
import SideBlogs from '@/components/side-blogs';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import { Blog } from '@prisma/client';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import CheckViewed from '../_components/check-viewed';

const getBlog = cache(async (blogId: string) => {
    const post = await prisma.blog.findUnique({
        where: {
            id: blogId,
        },
    });

    if (!post) return null;

    return post;
});

export default async function BlogDetail({ params }: { params: { blogId: string } }) {
    const post = await getBlog(params.blogId);
    const relatedBlogs = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/related/${params.blogId}`, {
        next: { revalidate: 60 },
    }).then((res) => res.json());
    const payload: Blog[] = relatedBlogs.data || [];
    if (!post) redirect('/404');
    return (
        <div className="wrapper space-y-12">
            <CheckViewed blogId={params.blogId} />
            <div className="content flex gap-8 md:gap-16 w-full">
                <div className="flex-1 flex flex-col gap-8 w-full">
                    <p className="text-sm text-primary opacity-45">{new Date(post.createdAt).toDateString()}</p>
                    <h3 className="text-4xl font-bold">{post.title}</h3>
                    <main
                        className="h-max prose w-fit max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></main>
                    <div className="space-y-4">
                        <div className="w-max">
                            <h4 className="text-xl font-semibold">Bài viết liên quan</h4>{' '}
                            <Separator className="border-2 border-primary" />
                        </div>
                        <CarouselBlogs blogs={payload} />
                    </div>
                </div>
                <div className="hidden lg:block space-y-16 w-72">
                    <div className="space-y-4">
                        <div>
                            <h6 className="text-base font-semibold">Tìm kiếm bài viết</h6>
                            <Separator className="border-2 border-primary" />
                        </div>
                        <SearchBar />
                    </div>
                    <SideBlogs />
                </div>
            </div>
        </div>
    );
}
