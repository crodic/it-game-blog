import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import Image from 'next/image';
import { Badge } from './ui/badge';

interface BlogCardProps {
    showDescription?: boolean;
}

export default function BlogCard({ showDescription }: BlogCardProps) {
    return (
        <Card className={cn('card-wrapper rounded-none col-span-1 h-max cursor-pointer')}>
            <CardHeader className="p-0 pb-4">
                <div className="relative w-full aspect-video">
                    <Image src="/image.png" alt="test" fill className="object-cover object-top" />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="text-xs sm:text-sm text-primary">{new Date().toUTCString()}</p>
                <CardTitle className="line-clamp-2">
                    [Honkai Star Rail] New Character Bronya Thứ Sinh Ngân Dực
                </CardTitle>
                {showDescription && (
                    <CardDescription className="line-clamp-3 flex-1">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga porro, quisquam pariatur
                        recusandae voluptates iste provident possimus! Esse, quaerat vitae.
                    </CardDescription>
                )}
            </CardContent>
            <CardFooter className="gap-2 flex-wrap">
                <Badge>Bronya</Badge>
                <Badge>Honkai Star Rail</Badge>
            </CardFooter>
        </Card>
    );
}
