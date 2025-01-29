import BlogCard from '@/components/blog-card';
import SearchBar from '@/components/search-bar';
import { Card, CardContent } from '@/components/ui/card';
import { PaginationWithLinks } from '@/components/ui/pagination-with-link';
import { Separator } from '@/components/ui/separator';

export default function Page() {
    return (
        <div className="wrapper">
            <div className="flex gap-8">
                <div className="flex-1 space-y-8">
                    <h4 className="text-xl font-semibold">Kết quả tìm kiếm cho: &ldquo;Genshin Impact&ldquo;</h4>
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <BlogCard key={item} showDescription />
                        ))}
                    </section>
                    <PaginationWithLinks page={2} pageSize={20} totalCount={500} siblingCount={2} />
                </div>
                <div className="w-80 hidden lg:block">
                    <Card className="sticky top-[84px]">
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <h6 className="text-base font-semibold">Tìm kiếm bài viết</h6>
                                <Separator className="border-2 border-primary" />
                            </div>
                            <SearchBar />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
