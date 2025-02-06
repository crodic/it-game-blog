import AnalysisCard from '@/components/analysis-card';
import { BlogChart } from './_components/blog-chart';
import { CategoryChart } from './_components/category-chart';

export default function Page() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <AnalysisCard title="Bài Viết" value={10} subText="bài viết" />
                <AnalysisCard title="Danh Mục" value={5} subText="danh mục" />

                <AnalysisCard title="Tổng lượt xem" value={1000000} subText="lượt xem" />

                <AnalysisCard title="Quan tâm" value={100} subText="đăng ký" />
            </div>
            <div className="grid md:grid-cols-[1fr_400px] grid-cols-1 gap-4">
                <div className="h-max">
                    <BlogChart />
                </div>
                <div className="h-max">
                    <CategoryChart />
                </div>
            </div>
        </div>
    );
}
