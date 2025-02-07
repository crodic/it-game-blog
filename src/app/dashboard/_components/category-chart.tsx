'use client';

import { TrendingUp } from 'lucide-react';
import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useQuery } from '@tanstack/react-query';
import { getCategoriesStats } from '@/services/apis/categories';

export function CategoryChart() {
    const { data } = useQuery({
        queryKey: ['categoryChart'],
        queryFn: getCategoriesStats,
    });

    const chartData = data?.map((item) => ({
        ...item,
    }));

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Thống kê danh mục</CardTitle>
                <CardDescription>Tổng bài viết trong danh mục</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={{}} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={chartData || []} dataKey="value" nameKey="category" />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    Danh sách danh mục có nhiều bài viết nhất <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">Hiển thị số lượng bài viết trong các danh mục</div>
            </CardFooter>
        </Card>
    );
}
