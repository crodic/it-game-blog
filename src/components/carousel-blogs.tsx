import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Blog } from '@prisma/client';
import BlogCard from './blog-card';

interface CarouselBlogsProps {
    blogs: Blog[];
}

export function CarouselBlogs({ blogs }: CarouselBlogsProps) {
    return (
        <Carousel
            opts={{
                align: 'start',
            }}
            className="w-full"
        >
            <CarouselContent>
                {blogs.map((blog) => (
                    <CarouselItem key={blog.id} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <BlogCard data={blog} showDescription hiddenTags />
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    );
}
