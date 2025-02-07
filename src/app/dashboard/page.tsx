import AnalysisCard from '@/components/analysis-card';
import { BlogChart } from './_components/blog-chart';
import { CategoryChart } from './_components/category-chart';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DASHBOARD | Bảng điều khiển',
    description: 'Trang bảng điều khiển cơ sở',
};

export default async function Page() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/analysis`, { cache: 'force-cache' }).then((res) =>
        res.json()
    );
    const payload = res.data;

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <AnalysisCard title="Bài Viết" value={payload.blogs} subText="bài viết" />
                <AnalysisCard title="Danh Mục" value={payload.categories} subText="danh mục" />
                <AnalysisCard title="Tổng lượt xem" value={payload.totalViews._sum.views} subText="lượt xem" />
                <AnalysisCard title="Quan tâm" value={payload.totalSubscribe} subText="đăng ký" />
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
