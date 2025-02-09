import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import FormStatus from './_components/form-status';
import { getStatusWebsite } from './actions';

export default async function Page() {
    const status = await getStatusWebsite();
    return (
        <Card className="">
            <CardHeader>
                <CardTitle>Cài đặt website</CardTitle>
                <CardDescription>Cấu hình website blog trên trang cài đặt này</CardDescription>
            </CardHeader>
            <CardContent>
                <FormStatus status={status} />
            </CardContent>
        </Card>
    );
}
