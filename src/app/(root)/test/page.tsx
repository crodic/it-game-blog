import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Page() {
    return (
        <main className="wrapper">
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[1, 2, 3, 4].map((item) => (
                    <MyCard key={item} />
                ))}
            </section>
        </main>
    );
}

function MyCard() {
    return (
        <Card className={cn('rounded-none col-span-1 h-max', 'sm:first:col-span-2', 'md:first:col-span-3')}>
            <CardHeader className="p-0 pb-4">
                <div className="relative w-full aspect-video">
                    <Image src="/bronya-2.png" alt="test" fill className="object-cover object-top" />
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
                <p className="text-sm text-primary">{new Date().toUTCString()}</p>
                <CardTitle className="line-clamp-2">
                    [Honkai Star Rail] New Character Bronya Thứ Sinh Ngân Dực
                </CardTitle>
                <CardDescription className="line-clamp-3 flex-1">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fuga porro, quisquam pariatur recusandae
                    voluptates iste provident possimus! Esse, quaerat vitae.
                </CardDescription>
            </CardContent>
            <CardFooter className="space-x-2">
                <Badge>Bronya</Badge>
                <Badge>Honkai Star Rail</Badge>
            </CardFooter>
        </Card>
    );
}
