import SearchBar from '@/components/search-bar';
import SideBlogs from '@/components/side-blogs';
import { Separator } from '@/components/ui/separator';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { cache, Suspense } from 'react';
import CheckViewed from '../_components/check-viewed';
import { Badge } from '@/components/ui/badge';
import RelatedBlogs from '../_components/related-blogs';

export const revalidate = 60;
export const dynamic = 'force-static';

const getBlog = cache(async (blogId: string) => {
    const post = await prisma.blog.findUnique({
        where: {
            id: blogId,
            isPublished: true,
        },
        include: {
            category: true,
        },
    });

    if (!post) return null;

    return post;
});

export async function generateStaticParams() {
    try {
        const blogs = await prisma.blog.findMany({
            select: { id: true },
            take: 4,
            where: { isPublished: true, views: { gt: 100 } },
        });
        return blogs.map((blog) => ({ blogId: blog.id }));
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function generateMetadata({ params }: { params: { blogId: string } }) {
    const post = await getBlog(params.blogId);
    if (!post) return {};
    return {
        title: post.title,
        description: post.description,
    };
}

export default async function BlogDetail({ params }: { params: { blogId: string } }) {
    const post = await getBlog(params.blogId);
    if (!post) notFound();
    return (
        <div className="wrapper space-y-12">
            <CheckViewed blogId={params.blogId} />
            <div className="content flex gap-8 md:gap-16 w-full">
                <div className="flex-1 flex flex-col gap-4 w-full">
                    <div className="space-y-2">
                        <Badge background={post.category.color}>{post.category.name}</Badge>
                        <p className="text-sm text-primary opacity-70">{new Date(post.createdAt).toDateString()} </p>
                        <h3 className="text-4xl font-bold">{post.title}</h3>
                        <span className="text-xs text-muted-foreground">Lượt xem: {post.views}</span>
                    </div>
                    <Separator className="border-primary" />
                    <main
                        className="h-max prose w-fit max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    ></main>
                    <div className="flex items-center gap-2">
                        <p>Tags: </p>
                        {post.tags.map((tag) => (
                            <Badge key={tag}>{tag}</Badge>
                        ))}
                    </div>
                    <Separator className="border-primary" />

                    <RelatedBlogs blogId={params.blogId} />
                </div>
                <div className="hidden lg:block space-y-16 w-72">
                    <div className="space-y-4">
                        <div>
                            <h6 className="text-base font-semibold">Tìm kiếm bài viết</h6>
                            <Separator className="border-2 border-primary" />
                        </div>
                        <Suspense>
                            <SearchBar />
                        </Suspense>
                    </div>
                    <SideBlogs />
                </div>
            </div>
        </div>
    );
}
