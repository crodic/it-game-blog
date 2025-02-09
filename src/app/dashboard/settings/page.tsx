import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import dynamic from 'next/dynamic';

const SwitchMode = dynamic(() => import('@/components/switch-mode'), { ssr: false });

export default function Page() {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Cài đặt chung</CardTitle>
                <CardDescription>Cấu hình không ảnh hưởng đến trang cài đặt này</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Label>Sáng/Tối</Label>
                <SwitchMode />
            </CardContent>
        </Card>
    );
}
