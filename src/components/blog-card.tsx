import Image from 'next/image';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface BlogCardProps {
    gridMode?: boolean;
}

export default function BlogCard({ gridMode }: BlogCardProps) {
    return (
        <li className="cursor-pointer group">
            <Card
                className={cn(
                    'blog-card w-full h-full rounded-none flex',
                    'md:group-hover:shadow-xl',
                    gridMode ? 'flex-row' : 'flex-col'
                )}
            >
                <CardHeader className={cn('blog-card__image p-0 flex-shrink-0 md:basis-1/2 basis-5/12')}>
                    <Image
                        // src="/yuki.jpg"
                        src="https://plus.unsplash.com/premium_photo-1721327111802-2de6e8f0f772?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="blog"
                        width={1576}
                        height={1080}
                        className="object-cover w-full md:h-56 h-[-webkit-fill-available] object-top"
                    />
                </CardHeader>
                <CardContent className="blog-card__content flex flex-col pt-2 px-4">
                    <span className="text-xs text-primary font-semibold">Olivia Rhye • 1 Jan 2023</span>
                    <div className="space-y-3">
                        <h4 className="font-semibold md:text-lg text-base break-all md:group-hover:text-primary/80 transition-colors duration-150 line-clamp-2">
                            Migrating to Linear 101 dasdasdhasjhjssajdhasjdhaskjdhsakdhaskdhskj
                        </h4>
                        <p className="line-clamp-3 md:text-sm text-xs text-muted-foreground">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ullam ex voluptatum maiores,
                            earum vel illo est quis, dolores unde quos dolor consectetur similique ipsa consequuntur
                            dolorem optio eos inventore aliquid ab provident placeat! Saepe ducimus exercitationem
                            placeat maiores non cupiditate suscipit deleniti amet, impedit fugiat, repudiandae eveniet
                            adipisci magnam.
                        </p>
                    </div>
                    <div className="flex gap-2 flex-wrap mt-6">
                        <Badge background="#9333EA">Anime</Badge>
                        <Badge background="#F59E0B">18+</Badge>
                    </div>
                </CardContent>
            </Card>
        </li>
    );
}
