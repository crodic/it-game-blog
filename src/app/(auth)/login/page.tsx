import { Metadata } from 'next';
import { LoginForm } from './_components/login-form';

export const metadata: Metadata = {
    title: 'DASHBOARD | Trang đăng nhập quản trị viên',
    description: 'Trang đăng nhập quản trị viên',
};

export default function LoginPage() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
