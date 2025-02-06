'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updateName } from '../actions';
import { User } from '@prisma/client';

export default function EditProfileForm({ user }: { user: Omit<User, 'password'> }) {
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isPending, startTransition] = useTransition();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        startTransition(async () => {
            const result = await updateName(name);
            if (result?.error) {
                setError(result.error);
            } else {
                setSuccessMessage(`Cập nhật thành công: ${result.name}`);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
                <Label htmlFor="name">Tên tài khoản</Label>
                <Input
                    name="name"
                    id="name"
                    placeholder={user.name}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <Button type="submit" disabled={isPending}>
                {isPending ? 'Đang cập nhật...' : 'Cập nhật'}
            </Button>
            {error && <p className="text-red-500">{error}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
        </form>
    );
}
