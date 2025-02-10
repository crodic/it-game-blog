'use client';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { Blog } from '@prisma/client';
import { useRouter } from 'next-nprogress-bar';

interface BlogCardProps {
    showDescription?: boolean;
    hiddenTags?: boolean;
    data: Blog;
}

export default function BlogCard({ showDescription, data, hiddenTags }: BlogCardProps) {
    const router = useRouter();
    const handleClick = () => {
        router.push(`/blogs/${data.id}`);
    };
    return (
        <Card
            onClick={handleClick}
            className={cn('card-wrapper rounded-none col-span-1 h-full cursor-pointer flex flex-col')}
        >
            <CardHeader className="p-0 pb-4">
                <Image
                    src={data.thumbnail}
                    alt={data.title}
                    width={1240}
                    height={720}
                    className="w-full h-auto aspect-video"
                    priority
                />
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="text-xs sm:text-sm text-primary">{new Date(data.createdAt).toUTCString()}</p>
                <CardTitle className="line-clamp-2">{data.title}</CardTitle>
                {showDescription && (
                    <CardDescription className="line-clamp-3 flex-1">{data.description}</CardDescription>
                )}
            </CardContent>
            {!hiddenTags && (
                <CardFooter className="gap-2 flex-wrap flex-1">
                    {data.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                    ))}
                    {data.tags.length > 2 && <Badge>...</Badge>}
                </CardFooter>
            )}
        </Card>
    );
}
