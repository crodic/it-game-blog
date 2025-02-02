import SearchBar from '@/components/search-bar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import BlogSearch from './_components/blog-search';

export default function Page() {
    return (
        <div className="wrapper">
            <div className="flex gap-8">
                <BlogSearch />
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
