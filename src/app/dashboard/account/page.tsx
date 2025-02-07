import { getSession } from '@/actions/auth';
import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import AvatarUpload from './_components/avatar-upload';
import { User } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import EditProfileForm from './_components/edit-profile-form';
import ChangePasswordForm from './_components/change-password-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DASHBOARD | Quản lý tài khoản',
    description: 'Trang quản lý tài khoản',
};

const getUser = cache(async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            role: true,
            password: false,
            createdAt: true,
            updatedAt: true,
        },
    });

    return user as Omit<User, 'password'> | null;
});

export default async function Page() {
    const session = await getSession();
    if (!session) return redirect('/login');

    const user = await getUser(session.user.id);
    if (!user) return redirect('/login');

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-semibold">Quản Lý Tài Khoản</h3>

            <Card>
                <CardContent className="space-y-4 pt-6">
                    <div className="space-y-4 flex gap-8">
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold">Ảnh đại diện</h4>
                            <AvatarUpload user={user} />
                        </div>
                        <div className="pt-4 text-lg">
                            <p>
                                Tên tài khoản: <span className="font-semibold">{user.name}</span>
                            </p>
                            <p>
                                Email: <span className="font-semibold">{user.email}</span>
                            </p>
                            <p>
                                Vai trò: <span className="font-semibold">{user.role}</span>
                            </p>
                        </div>
                    </div>
                    <Separator />
                    <div>
                        <h4 className="text-lg font-semibold">Thông tin cá nhân</h4>
                        <EditProfileForm user={user} />
                    </div>
                    <Separator />
                    <div>
                        <h4 className="text-lg font-semibold">Đổi mật khẩu</h4>
                        <ChangePasswordForm />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
