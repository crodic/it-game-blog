'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormState } from 'react-dom';
import { changePassword } from '../actions';

export default function ChangePasswordForm() {
    const [state, actionChange] = useFormState(changePassword, null);
    return (
        <form action={actionChange} className="space-y-4 mt-4">
            <div className="space-y-2">
                <Label>Mật khẩu hiện tại</Label>
                <Input name="password" placeholder="Enter your current password" type="password" />
            </div>
            {state?.error?.password && <p className="text-red-500">{state.error.password}</p>}
            <div className="space-y-2">
                <Label>Mật khẩu mới</Label>
                <Input name="newPassword" placeholder="Enter your new password" type="password" />
            </div>
            {state?.error?.newPassword && <p className="text-red-500">{state.error.newPassword}</p>}
            <div className="space-y-2">
                <Label>Nhập lại mật khẩu mới</Label>
                <Input name="confirmPassword" placeholder="Confirm your new password" type="password" />
            </div>
            {state?.error?.confirmPassword && <p className="text-red-500">{state.error.confirmPassword}</p>}
            <Button type="submit">Cập nhật mật khẩu</Button>
        </form>
    );
}
