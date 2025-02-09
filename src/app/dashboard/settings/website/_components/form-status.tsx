'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { changeStatus } from '../actions';
import { useFormState } from 'react-dom';

const STATUS = {
    ONLINE: 'Đang hoạt động',
    MAINTENANCE: 'Bảo trì',
    OFFLINE: 'Tạm Khoá',
} as const;

export default function FormStatus({ status }: { status: 'ONLINE' | 'MAINTENANCE' | 'OFFLINE' }) {
    const [state, action] = useFormState(changeStatus, null);

    return (
        <form action={action} className="space-y-4">
            <Label className="inline-block">Trạng Thái Website: {STATUS[status]}</Label>
            <Select name="status" defaultValue={status}>
                <SelectTrigger>
                    <SelectValue placeholder="Trạng thái server" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="ONLINE">Đang hoạt động</SelectItem>
                    <SelectItem value="OFFLINE">Tạm Khoá</SelectItem>
                    <SelectItem value="MAINTENANCE">Bảo trì</SelectItem>
                </SelectContent>
            </Select>
            <Button type="submit">Lưu</Button>
            {state?.message && <p className="text-green-500">{state.message}</p>}
        </form>
    );
}
